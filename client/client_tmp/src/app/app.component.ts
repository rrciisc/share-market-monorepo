import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'share-market-client';

  constructor(http: HttpClient) {
    http.get('/api').subscribe((data: string) => {
      setTimeout(() => {
        this.title = data;
      }, 3000);
    });
  }
}
