import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyQuotesService {

  quotesUrl: string = "https://quotes.rest/qod"
  apiToken: string = "MRYy72l2DAq8m33rwesJCNT00ssJkFXatwvQqCMt"

  constructor(private http:HttpClient) { }

  getDailyQuote(): Observable<any> {
    const url = `${this.quotesUrl}?api_key=${this.apiToken}`;
    return this.http.get<any>(url)
    .pipe(tap((response: any) => {
      const quote = response.contents.quotes[0].quote;
      const author = response.contents.quotes[0].author;

      localStorage.setItem('dailyQuote', quote);
      localStorage.setItem('dailyQuoteAuthor', author);
    }));;
  }

}
