import { Component } from '@angular/core';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {

  
  selectedItem: Item[];
  loading: boolean = true;

  constructor(public trove: FirebaseApiService ) {

    this.trove.getItems().subscribe(response => {
      
      this.trove.items = response;
      this.loading = false;
    });
  }

  deleteItem(item: any) {

    let id: string = item.id; 
    this.trove.deleteItem(id);
  }


}
