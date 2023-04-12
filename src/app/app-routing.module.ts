import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './components/sell/sell.component';
import { BuyComponent } from './components/buy/buy.component';
import { ItemComponent } from './components/item/item.component';
import { FlippingComponent } from './components/flipping/flipping.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'item', pathMatch: 'full' },
  { path: 'sell', component: SellComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'item', component: ItemComponent },
  { path: 'flipping', component: FlippingComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: '**', redirectTo: 'item', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
