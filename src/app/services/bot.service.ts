import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  private availability: Subject<boolean> = new Subject();

  constructor() { 
  }

  getBotAvailability(): Observable<boolean> {
    return this.availability.asObservable();
  }

  setBotAvailability(value: boolean): void {
    this.availability.next(value);
  }
}
