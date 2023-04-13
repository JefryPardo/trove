import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Item } from '../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  items: Item[];

  constructor(private firestore: Firestore) {}

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
}
