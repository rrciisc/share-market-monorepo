import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor() { }

  getMarketStatus(): Observable<string> {
    return Observable.create(observer => {
      observer.next('closed');
      setTimeout(() => observer.next('open'), 3000);
      setTimeout(() => observer.next('closed'), 10000);
      setTimeout(() => observer.complete(), 11000);
    });
  }
}
