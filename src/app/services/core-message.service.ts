import { Injectable } from '@angular/core';
import { distinctUntilChanged, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreMessageService {
  private message$ = new Subject<string>();

  constructor() { }

  setMessage(text: string) {
    this.message$.next(text);
  }

  getMessage() {
    return this.message$.asObservable().pipe(distinctUntilChanged());
  }

  endConversation(): void {
    this.message$.complete();
  }

}
