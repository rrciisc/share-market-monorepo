import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Symbol } from "../symbol/symbol";

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getMarketStatus(): Observable<string> {
    return this.http.get<string>('/api/market/status');
  }

  getSymbolInfo(id: string): Observable<Symbol> {
    return this.http.get<Symbol>(`/api/market/symbol/${id}`);
  }

  getSymbolsInfo(ids: string[]): Observable<Symbol[]> {
    return this.http.get<Symbol[]>(`/api/market/symbols/${ids.join(',')}`);
  }
}
