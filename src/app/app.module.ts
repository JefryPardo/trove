import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './component/item/item.component';
import { BuyComponent } from './component/buy/buy.component';
import { SellComponent } from './component/sell/sell.component';
import { FlippingComponent } from './component/flipping/flipping.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    BuyComponent,
    SellComponent,
    FlippingComponent,
    InventoryComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
