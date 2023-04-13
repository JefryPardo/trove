import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';
import { BuyItem } from '../model/buy.item';
import { SellItem } from '../model/sell.item';
import { Inventory } from '../model/inventory';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  items: Item[];
  buyItems: BuyItem[];
  sellItems: SellItem[];

  constructor(private firestore: Firestore) {}

  // Items api
  createItem(item: Item) {

    const itemRef = collection(this.firestore, 'item');
    return addDoc(itemRef,item);
  }
  
  getItems():Observable<Item[]> {
    
    const itemRef = collection(this.firestore, 'item');
    return collectionData(itemRef, {idField: 'id'}) as Observable<Item[]>;
  }
  
  
  deleteItem(item: string) {
    
    const itemRef = doc(this.firestore, `item/${item}`);
    return deleteDoc(itemRef);
  }
  
  
  // Buy items api
  getBuyItems():Observable<BuyItem[]> {
    
    const itemRef = collection(this.firestore, 'buy_item');
    return collectionData(itemRef, {idField: 'id'}) as Observable<BuyItem[]>;
  }

  createBuyItem(buyItem: BuyItem) {

    const itemRef = collection(this.firestore, 'buy_item');
    return addDoc(itemRef,buyItem);
  }

  deleteBuyItem(item: string) {
    
    const itemRef = doc(this.firestore, `buy_item/${item}`);
    return deleteDoc(itemRef);
  }


  // Sell items api
  getSellItems():Observable<SellItem[]> {
    
    const itemRef = collection(this.firestore, 'sell_item');
    return collectionData(itemRef, {idField: 'id'}) as Observable<SellItem[]>;
  }

  createSellItem(sellItem: BuyItem) {

    const itemRef = collection(this.firestore, 'sell_item');
    return addDoc(itemRef,sellItem);
  }

  deleteSellItem(item: string) {
    
    const itemRef = doc(this.firestore, `sell_item/${item}`);
    return deleteDoc(itemRef);
  }


  // invaentario
  createInventario(inventory: Inventory) {

    const itemRef = collection(this.firestore, 'inventory');
    return addDoc(itemRef,inventory);
  }


  // 
  getFortmaroDate(fechaEntrada: string) {

    const [day,month,year] = fechaEntrada.split('/');
    const date = new Date(year.substring(0, 4)+"-"+month+"-"+day);

    return date.toDateString();
  }
}
