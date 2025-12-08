import { inject, Injectable } from '@angular/core';
import { IMessage } from '../models/message.model';
import { merge, scan, Subject } from 'rxjs';
import { BotService } from './bot.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  botService = inject(BotService);
  userService = inject(UserService);

  private messagesList$ = new Subject<IMessage[]>();

  constructor() {
    this.listenConversation();
  }

  get messages() {
    return this.messagesList$.asObservable();
  }

  private listenConversation() {
    merge(this.userService.getUserStream(), this.botService.getBotStream()).pipe(
      scan((acc: IMessage[], msg: IMessage) => [...acc, msg],[])
    ).subscribe(value => this.messagesList$.next(value));
  }
}
