import { inject, Injectable } from '@angular/core';
import { IMessage } from '../models/message.model';
import { delay, first, last, map, merge, scan, Subject } from 'rxjs';
import { BotService } from './bot.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  botService = inject(BotService);

  private message$ = new Subject<string>();
  private messagesList$ = new Subject<IMessage[]>();
  constructor() {
    this.initializeResponses();
  }

  setMessage(text: string) {
    this.message$.next(text);
  }

  getMessage() {
    this.message$.asObservable();
  }

  endConversation(): void {
    this.message$.complete();
  }

  get messages() {
    return this.messagesList$.asObservable();
  }

  initializeResponses() {
    const userStream = this.message$.pipe(
      map(msg => <IMessage>({
          author: 'user',
          content: msg,
          time: new Date()
        })
      ));

    const botStream = this.message$.pipe(
        delay(2000),
        map(msg => <IMessage>({
          author: 'bot',
          content: `Hello`,
          time: new Date()
        }))
    );


    merge(userStream, botStream).pipe(
      scan((acc: IMessage[], msg: IMessage) => [...acc, msg],[])
    ).subscribe(this.messagesList$);
    //why?

    this.setBotAvailability();
  }

  setBotAvailability(): void {
    this.message$.pipe(
      first(),
      delay(1000),
    ).subscribe(() => this.botService.setBotAvailability(true));

    this.message$.pipe(
      last(),
      delay(1000),
    ).subscribe(() => this.botService.setBotAvailability(false));
  }
}
