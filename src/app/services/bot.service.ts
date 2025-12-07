import { inject, Injectable } from '@angular/core';
import { delay, first, last, map, Observable, Subject } from 'rxjs';
import { IMessage } from '../models/message.model';
import { CoreMessageService } from './core-message.service';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  coreMessagesService = inject(CoreMessageService);

  private readonly botAvailabilityDelay = 1000;
  private readonly botIsTypingDelay = 2000;
  private readonly replyDelay = 3000;

  private availability: Subject<boolean> = new Subject();
  private isTyping: Subject<boolean> = new Subject();

  private botStream: Observable<IMessage>;

  constructor() {
    this.defineBotStream();
    this.listenToBotAvailabilityChanges();
    this.listenToBotIsTypingChanges();
  }

  listenToBotIsTypingChanges() {
    this.coreMessagesService.getMessage().pipe(
      delay(this.botIsTypingDelay)
    ).subscribe(() => this.isTyping.next(true));
    
    this.botStream.subscribe(() => {
      this.isTyping.next(false);
    });
  }

  private defineBotStream() {
    this.botStream = this.coreMessagesService.getMessage().pipe(
      delay(this.replyDelay),
      map(msg => <IMessage>({
        author: 'bot',
        content: `Hello`,
        time: new Date()
      }))
    );
  }

  getBotStream() {
    return this.botStream;
  }

  getBotIsTyping() : Observable<boolean> {
    return this.isTyping.asObservable();
  }

  getBotAvailability(): Observable<boolean> {
    return this.availability.asObservable();
  }

  setBotAvailability(value: boolean): void {
    this.availability.next(value);
  }

  listenToBotAvailabilityChanges(): void {
    this.coreMessagesService.getMessage().pipe(
      first(),
      delay(this.botAvailabilityDelay),
    ).subscribe(() => this.setBotAvailability(true));

    this.coreMessagesService.getMessage().pipe(
      last(),
      delay(this.botAvailabilityDelay),
    ).subscribe(() => this.setBotAvailability(false));
  }
}
