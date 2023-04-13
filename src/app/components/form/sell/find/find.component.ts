import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { SellItem } from 'src/app/model/sell.item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find-sell-item',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindSellItemComponent {

  selectedSellItem: SellItem[];
  loading: boolean = true;

  formClave: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService
  ) {

    this.formClave = this.inicializarFormularioClave();

    this.trove.getSellItems().subscribe((response) => {

      this.trove.sellItems = response;
      this.loading = false;
    });
  }

  deleteSellItem(item: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = item.id; 
          this.trove.deleteSellItem(id);
        }
      },
      reject: () => {return}
    });
  }

  inicializarFormularioClave(): FormGroup {

    return this.fb.group({
      'clave':         new FormControl("", Validators.required)
    });
  }
}