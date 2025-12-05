import { Injectable } from '@angular/core';
import { IMessage } from '../models/message.model';
import { delay, filter, map, merge, scan, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private userMessage$ = new Subject<string>();
  private messages$ = new Subject<IMessage[]>();
  constructor() {
    this.initializeResponses();
  }

  sendMessage(text: string) {
    this.userMessage$.next(text);
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
        delay(500),
        map(msg => <IMessage>({
          author: 'bot',
          content: `Echo: ${msg}`,
          time: new Date()
        }))
    );

    merge(userStream, botStream).pipe(
      scan((acc: IMessage[], msg: IMessage) => [...acc, msg],[])
    ).subscribe(this.messages$);

    //why?
  }
}
