import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
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
  inventory: Inventory[];

  constructor(private firestore: Firestore) {

    this.getInventory().subscribe((response) => {

      console.log('inventory');
      this.inventory = response;
    });
    
    this.getItems().subscribe(response => {
      
      console.log('items');
      this.items = response;
    });
    
    this.getBuyItems().subscribe((response) => {
      
      console.log('buyItems');
      this.buyItems = response;
    });
    
    this.getSellItems().subscribe((response) => {
      
      console.log('sellItems');
      this.sellItems = response;
    });
  }

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

  getByIdBuyItems(id: string) {
    
    const itemRef = doc(this.firestore,"buy_item", id);
    return getDoc(itemRef);
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

  getInventory():Observable<Inventory[]> {
    
    const itemRef = collection(this.firestore, 'inventory');
    return collectionData(itemRef, {idField: 'id'}) as Observable<Inventory[]>;
  }
  
  getByIdItemInventory(id: string): Inventory | null {
    
    let inventario: Inventory | null = null;
    this.inventory.forEach(inv =>{
      
      if(inv.item.id == id) {

        inventario = inv;
      }
    });

    return inventario;
  }

  async getIdInventory() {

    return this.getInventory().subscribe(resp => {

      console.log(resp);
      this.inventory = resp;
    })
  }
  
  updateInventory(inventory: Inventory) {
    
    const itemRef = doc(this.firestore, `inventory/${inventory.id}`);
    updateDoc(itemRef, inventory as any);
  }


  // 
  getFortmaroDate(fechaEntrada: string) {

    const [day,month,year] = fechaEntrada.split('/');
    const date = new Date(year.substring(0, 4)+"-"+month+"-"+day);

    return date.toDateString();
  }
}
