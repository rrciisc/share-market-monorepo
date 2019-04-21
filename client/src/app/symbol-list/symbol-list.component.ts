import { Component, OnInit } from '@angular/core';
import { Symbol } from '../symbol/symbol';

@Component({
  selector: 'app-symbol-list',
  templateUrl: './symbol-list.component.html',
  styleUrls: ['./symbol-list.component.css']
})
export class SymbolListComponent implements OnInit {
  public viewModels: Symbol[] = [];

  constructor() {
    const infy = new Symbol('Infosys Ltd', 'INFY', 717.05, -7.05);
    const wipro = new Symbol('Wipro', 'WIPRO', 284.80, 3.90);
    const rel = new Symbol('Reliance Inds', 'RELIANCE', 1385.95, 42.20);
    this.viewModels.push(wipro, infy, rel);
  }

  ngOnInit() {
    ($('table.sortable') as any).tablesort();
  }

}
