import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { IMessage } from '../models/message.model';

@Component({
  selector: 'app-chat-content',
  imports: [MatExpansionModule],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss'
})
export class ChatContentComponent {
  messages: IMessage[] =[];
}
