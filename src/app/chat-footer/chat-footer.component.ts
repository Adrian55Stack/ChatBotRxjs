import { Component, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat-footer',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss'
})
export class ChatFooterComponent{
  messageService = inject(MessagesService);

  input: FormControl = new FormControl();

  sendMessage() {
    this.messageService.sendMessage(this.input.value);
    this.input.reset();
  }

  endConversation() {
    this.messageService.endConversation();
  }
}
