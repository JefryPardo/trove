import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';
import { BuyItem } from '../model/buy.item';
import { SellItem } from '../model/sell.item';
import { Inventory } from '../model/inventory';
import { Flipping } from '../model/flipping';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  items: Item[];
  buyItems: BuyItem[];
  sellItems: SellItem[];
  inventory: Inventory[];
  flippings: Flipping[];


  // flipping
  flipping_mas_alto: Flipping;
  flipping_mas_bajo: Flipping;

  resultadoFlipping: boolean = false;

  estadoLeft  : boolean = true;
  estadoRight : boolean = true;

  itemLevelSelect: Item[] = [];
  selectedItem: Item;
  
  selectedItemCopy: Item = {
    id: '0',
    nombre: 'no found',
    tipo: 'no found',
    nivelFlipping: 'no found'
  };

  levelSelect: String = '3';

  left: number;
  right: number;


  defauld = {
    item: {
      id: '0',
      nombre: 'no found',
      tipo: 'no found',
      nivelFlipping: 'no found'
    },
    cantidad: 0,
    precioTotal: 0,
    precioUnidad: 0,
    pr: 0,
    fecha: 'no found',
    precio: 0
  }

  constructor(private firestore: Firestore, private mensaje: ToastService) {

    this.getItems().subscribe(response => {
      
      console.log('items');
      this.items = response;
      this.level();
    });

    this.getInventory().subscribe((response) => {

      console.log('inventory');
      this.inventory = response;
    });
    
    
    this.getBuyItems().subscribe((response) => {
      
      console.log('buyItems');
      this.buyItems = response;
    });
    
    this.getSellItems().subscribe((response) => {
      
      console.log('sellItems');
      this.sellItems = response;
    });
    
    this.getFlipping().subscribe((response) => {
      
      console.log('flipping');
      this.flippings = response;
    });

    this.flipping_mas_alto = this.defauld;
    this.flipping_mas_bajo = this.defauld;
    
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

    if(fechaEntrada == 'no found') return fechaEntrada;

    const [day,month,year] = fechaEntrada.split('/');

    const date = new Date(year.substring(0, 4)+"-"+month+"-"+day);

    return date.toDateString();
  }

  // flipping
  // invaentario
  createFlipping(flipping: Flipping) {

    const itemRef = collection(this.firestore, 'flipping');
    return addDoc(itemRef,flipping);
  }

  getFlipping():Observable<Flipping[]> {
    
    const itemRef = collection(this.firestore, 'flipping');
    return collectionData(itemRef, {idField: 'id'}) as Observable<Flipping[]>;
  }

  deleteFlipping(item: string) {
    
    const itemRef = doc(this.firestore, `flipping/${item}`);
    return deleteDoc(itemRef);
  }

  flipping(item:Item) {

    let flipping_result:Flipping[] = [];
    this.flipping_mas_alto = this.defauld;
    this.flipping_mas_bajo = this.defauld;

    if(this.flippings.length <= 0) {

      this.mensaje.mostrarAlertaWarn("Sin registros","El item no tiene flipping.");
      return;
    }
    
    this.flippings.forEach(f => {
      
      if(f.item.id == item.id) {
        
        flipping_result.push(f);
      }
    });
    
    if(flipping_result.length <= 0) {
      
      this.mensaje.mostrarAlertaWarn("Sin registros","El item no tiene flipping.");
      return;
    }

    this.flipping_mas_alto = flipping_result.reduce((accumulator, current) => {
      return accumulator.precioUnidad > current.precioUnidad ? accumulator : current;
    });
    
    this.flipping_mas_bajo = flipping_result.reduce((accumulator, current) => {
      return accumulator.precioUnidad < current.precioUnidad ? accumulator : current;
    });

    this.resultadoFlipping = true;
  }




  level() {

    switch(this.levelSelect){

      case '1': { 

        this.levelSelect = '2';  
        break; 
      } 
     case '2': { 
      
      this.levelSelect = '3';
      break; 
     }
     case '3': { 
      
      this.levelSelect = '1'; 
      break; 
     }
    }

    this.itemLevelSelect = [];

    this.items.forEach(item => {

      if(item.nivelFlipping == this.levelSelect) {

        this.itemLevelSelect.push(item);
      }

    });

    if(this.itemLevelSelect.length == 0){return;}

    this.estadoRight = false;
    this.estadoLeft  = true;

    this.left = 0;
    this.right = this.itemLevelSelect.length-1;

    this.selectedItemCopy = this.itemLevelSelect[0]; 
  }

  leftBoton() {

    this.left = this.left-1;

    this.estadoRight = false;
    if(this.left == 0) {

      this.estadoLeft = true;
    }

    this.selectedItemCopy = this.itemLevelSelect[this.left]; 
  }
  rightBoton() {

    this.left = this.left+1;
    this.estadoLeft = false;

    if(this.left == this.right) {

      this.estadoRight = true;
    }

    this.selectedItemCopy = this.itemLevelSelect[this.left]; 
  }
}
