import { Component } from '@angular/core';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {

  item: Item[];
  selectedItem: Item[];
  loading: boolean = true;

  constructor(private trove: FirebaseApiService) {

    this.trove.getItems().subscribe(response => {
      
      this.item = response;
      this.loading = false;
    });
  }

  deleteItem(item: any) {

    console.log(item.id);
    
    let id: string = item.id; 
    console.log(id);
    
    this.trove.deleteItem(id);
  }


}
