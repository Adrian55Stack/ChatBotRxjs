import { inject, Injectable } from '@angular/core';
import { delay, first, last, map, Observable, Subject } from 'rxjs';
import { IMessage } from '../models/message.model';
import { MessagesService } from './messages.service';
import { CoreMessageService } from './core-message.service';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  coreMessagesService = inject(CoreMessageService);

  private availability: Subject<boolean> = new Subject();

  private botStream: Observable<IMessage>;

  constructor() {
    this.defineBotStream();
    this.listenToBotAvailabilityChanges();
  }

  defineBotStream() {
    this.botStream = this.coreMessagesService.getMessage().pipe(
      delay(2000),
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

  getBotAvailability(): Observable<boolean> {
    return this.availability.asObservable();
  }

  setBotAvailability(value: boolean): void {
    this.availability.next(value);
  }

  listenToBotAvailabilityChanges(): void {
    this.coreMessagesService.getMessage().pipe(
      first(),
      delay(1000),
    ).subscribe(() => this.setBotAvailability(true));

    this.coreMessagesService.getMessage().pipe(
      last(),
      delay(1000),
    ).subscribe(() => this.setBotAvailability(false));
  }
}
