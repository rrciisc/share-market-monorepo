import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SymbolComponent } from './symbol/symbol.component';
import { SymbolListComponent } from './symbol-list/symbol-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SymbolComponent,
    SymbolListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
