import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ItemComponent } from './components/item/item.component';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { FlippingComponent } from './components/flipping/flipping.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


import { CreateItemComponent } from './components/form/item/create/create.component';
import { FindItemComponent } from './components/form/item/find/find.component';

import { CreateBuyItemComponent } from './components/form/buy/create/create.component';
import { FindBuyItemComponent } from './components/form/buy/find/find.component';


import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { CreateSellItemComponent } from './components/form/sell/create/create.component';
import { FindSellItemComponent } from './components/form/sell/find/find.component';
import { FindInventoryComponent } from './components/form/inventory/find/find.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

import { ToastService } from './service/toast.service';
import { MessageService } from 'primeng/api';
import { FindComponent } from './components/form/flipping/find/find.component';
import { ResultComponent } from './components/form/flipping-search/result/result.component';
import { CreateComponent } from './components/form/flipping/create/create.component';
import { FlippingSearchFindComponent } from './components/form/flipping-search/find/find.component';
import { SearchFlippingComponent } from './components/search-flipping/search-flipping.component';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    BuyComponent,
    SellComponent,
    FlippingComponent,
    InventoryComponent,
    NavbarComponent,
    FooterComponent,    
    CreateBuyItemComponent,
    FindBuyItemComponent,    
    CreateItemComponent,
    FindItemComponent,
    CreateSellItemComponent,
    FindSellItemComponent,
    FindInventoryComponent,
    FindComponent,
    ResultComponent,
    FlippingSearchFindComponent,
    CreateComponent,
    SearchFlippingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    CardModule,
    DropdownModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    CalendarModule,
    InputNumberModule,
    ToastModule,
    RippleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [MessageService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
