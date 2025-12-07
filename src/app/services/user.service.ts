import { inject, Injectable } from '@angular/core';
import { MessagesService } from './messages.service';
import { map, Observable, Subject } from 'rxjs';
import { IMessage } from '../models/message.model';
import { CoreMessageService } from './core-message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  coreMessagesService = inject(CoreMessageService);

  private userStream: Observable<IMessage>;

  constructor() {
    this.defineUserStream();
  }

  defineUserStream() {
    this.userStream = this.coreMessagesService.getMessage().pipe(
      map(msg => <IMessage>({
        author: 'user',
        content: msg,
        time: new Date()
      })
      ));
  }

  getUserStream() {
    return this.userStream;
  }
}
