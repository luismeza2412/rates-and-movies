import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private readonly url = 'assets/exchange-rates.json';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.url);
  }
}
