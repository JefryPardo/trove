import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';
import { BuyComponent } from './components/buy/buy.component';
import { ItemComponent } from './components/item/item.component';
import { FlippingComponent } from './components/flipping/flipping.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { SearchFlippingComponent } from './components/search-flipping/search-flipping.component';
import { CalculatorComponent } from './components/calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: 'item', pathMatch: 'full' },
  { path: 'sell', component: SellComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'item', component: ItemComponent },
  { path: 'flipping', component: FlippingComponent },
  { path: 'search_flipping', component: SearchFlippingComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', redirectTo: 'item', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
