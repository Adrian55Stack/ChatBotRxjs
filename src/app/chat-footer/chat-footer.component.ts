import { Component, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../services/messages.service';
import { CoreMessageService } from '../services/core-message.service';
import { BehaviorSubject, concatMap, debounceTime, Observable, of, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-footer',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './chat-footer.component.html',
  styleUrl: './chat-footer.component.scss'
})
export class ChatFooterComponent implements OnInit {
  coreMessageService = inject(CoreMessageService);

  input: FormControl = new FormControl();

  isDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.listenToValueChanges();
  }

  listenToValueChanges() {
    this.input.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(val => {
      this.isDisabled$.next(!val);
    });
  }

  sendMessage() {
    this.coreMessageService.setMessage(this.input.value);
    this.input.reset();
    this.isDisabled$.next(true);
  }

  endConversation() {
    this.coreMessageService.endConversation();
  }
}
