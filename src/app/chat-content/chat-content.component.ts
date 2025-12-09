import { Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { IMessage } from '../models/message.model';
import { MessagesService } from '../services/messages.service';
import { debounceTime, delay, Observable, Subject } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BotService } from '../services/bot.service';

@Component({
  selector: 'app-chat-content',
  imports: [MatExpansionModule, AsyncPipe, DatePipe],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})
export class ChatContentComponent implements OnInit {
  messagesService = inject(MessagesService);
  botService = inject(BotService);

  messages: Observable<IMessage[]>;
  botIsTyping: Observable<boolean>;

  ngOnInit(): void {
    this.messages = this.messagesService.messages;
    this.botIsTyping = this.botService.getBotIsTyping();
    this.listenToScrollIntoViewEvent();
  }

  listenToScrollIntoViewEvent() {
    this.messagesService.getScrollIntoViewEvent()
    .pipe(
      delay(500),
    ).subscribe(resp => {
      const element = document.getElementById(resp.toString());
      element?.scrollIntoView();
    });
  }

}
