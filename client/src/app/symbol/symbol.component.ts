import { Component, OnInit, Input } from '@angular/core';
import { Symbol } from "./symbol";

@Component({
  selector: '[app-symbol]',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.css'],

})
export class SymbolComponent implements OnInit {
  @Input() vm: Symbol;

  constructor() { }

  ngOnInit() {}
}
