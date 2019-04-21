import { Component, OnInit } from '@angular/core';
import { Symbol } from '../symbol/symbol';
import { MarketService } from '../market/market.service';

@Component({
  selector: 'app-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.css']
})
export class SymbolListComponent implements OnInit {
  public viewModels: Symbol[] = [];
  private symbols: string[];

  constructor(private marketService: MarketService) {
    this.symbols = [
      'SPAL', 'GUFICBIO', 'WELENT', 'JSL', 'SURYAROSNI', 'SCHAND',
      'VISAKAIND', 'LAURUSLABS', 'DWARKESH', 'ASTEC',
      'DMART', 'SBIN', 'INFY', 'TCS', 'ICICIBANK', 'HDFCBANK', 'WIPRO'
    ];
  }

  ngOnInit() {
    ($('table.sortable') as any).tablesort();

    for (let i = 0; i < this.symbols.length; i++) {
      this.marketService.getSymbolInfo(this.symbols[i]).subscribe(info => {
        this.viewModels.push(info);
        this.viewModels.sort((a, b) => b.deliveryPercentage - a.deliveryPercentage);
      });
    }
  }

}
