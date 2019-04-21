import { Component, OnInit } from '@angular/core';
import { MarketService } from './market/market.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Share Market';
  marketStatus: string;

  constructor(private marketService: MarketService) {}

  ngOnInit() {
    this.marketService.getMarketStatus().subscribe(status => {
      this.marketStatus = status;
    });
  }
}
