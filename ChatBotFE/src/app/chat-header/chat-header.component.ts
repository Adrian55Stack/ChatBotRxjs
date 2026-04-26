import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BotService } from '../services/bot.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-header',
  imports: [AsyncPipe],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent implements OnInit {
  botService = inject(BotService);
  availability: Observable<boolean>;

  ngOnInit(): void {
    this.availability = this.botService.getBotAvailability();
  }
}
