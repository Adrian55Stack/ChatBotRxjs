import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreMessageService {
  private readonly message$ = new Subject<string>();

  constructor() { }

  setMessage(text: string) {
    this.message$.next(text);
  }

  getMessage() {
    return this.message$.asObservable().pipe(
      filter(msg => !!msg.trim()),
      distinctUntilChanged());
  }

  endConversation(): void {
    this.message$.complete();
  }

}
