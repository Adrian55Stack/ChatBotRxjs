import { inject, Injectable } from '@angular/core';
import { IMessage } from '../models/message.model';
import { delay, last, map, merge, scan, Subject, take } from 'rxjs';
import { BotService } from './bot.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  botService = inject(BotService);

  private userMessage$ = new Subject<string>();
  private messages$ = new Subject<IMessage[]>();
  constructor() {
    this.initializeResponses();
  }

  sendMessage(text: string) {
    this.userMessage$.next(text);
  }
  endConversation(): void {
    this.userMessage$.complete();
  }

  get messages() {
    return this.messages$.asObservable();
  }

  initializeResponses() {
    const userStream = this.userMessage$.pipe(
      map(msg => <IMessage>({
          author: 'user',
          content: msg,
          time: new Date()
        })
      ));

    const botStream = this.userMessage$.pipe(
        delay(2000),
        map(msg => <IMessage>({
          author: 'bot',
          content: `Hello`,
          time: new Date()
        }))
    );


    merge(userStream, botStream).pipe(
      scan((acc: IMessage[], msg: IMessage) => [...acc, msg],[])
    ).subscribe(this.messages$);
    //why?

    this.setBotAvailability();
  }

  setBotAvailability(): void {
    this.userMessage$.pipe(
      delay(1000),
      take(1)
    ).subscribe(() => this.botService.setBotAvailability(true));

    this.userMessage$.pipe(
      last(),
      delay(1000),
    ).subscribe(() => this.botService.setBotAvailability(false));
  }
}
