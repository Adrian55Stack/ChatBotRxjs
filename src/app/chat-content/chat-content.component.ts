import { Component, inject, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { IMessage } from '../models/message.model';
import { MessagesService } from '../services/messages.service';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-content',
  imports: [MatExpansionModule, AsyncPipe, DatePipe],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})
export class ChatContentComponent implements OnInit {
  messagesService = inject(MessagesService);
  messages: Observable<IMessage[]>;

  ngOnInit(): void {
  this.messages = this.messagesService.messages;  
  }
  
}
