import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatFooterComponent } from './chat-footer/chat-footer.component';
import { ChatContentComponent } from './chat-content/chat-content.component';

@Component({
  selector: 'app-root',
  imports: [ChatHeaderComponent, ChatContentComponent, ChatFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ChatBotRxjs';
}
