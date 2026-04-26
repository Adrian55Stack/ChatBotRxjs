import { inject, Injectable } from '@angular/core';
import { IMessage } from '../models/message.model';
import { merge, scan, Subject, tap } from 'rxjs';
import { BotService } from './bot.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  botService = inject(BotService);
  userService = inject(UserService);

  private readonly messagesList$ = new Subject<IMessage[]>();
  private readonly scrollIntoViewEvent = new Subject<number>();

  constructor() {
    this.listenConversation();
  }

  get messages() {
    return this.messagesList$.asObservable();
  }

  getScrollIntoViewEvent() {
    return this.scrollIntoViewEvent.asObservable();
  }

  private listenConversation() {
    merge(this.userService.getUserStream(), this.botService.getBotStream()).pipe(
      tap(val => {
        this.scrollIntoViewEvent.next(val.id)
      }),
      scan((acc: IMessage[], msg: IMessage) => [...acc, msg],[]),
    ).subscribe(value => this.messagesList$.next(value));
  }
}
