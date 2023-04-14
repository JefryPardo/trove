import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Inventory } from 'src/app/model/inventory';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find-inventory',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindInventoryComponent {

  selectedInventory: Inventory[];

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService
  ) {

    
  }

  loading() {

    return !(this.trove.inventory != undefined && this.trove.inventory.length >= 0);
  }
}