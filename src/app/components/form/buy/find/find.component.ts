import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { BuyItem } from 'src/app/model/buy.item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find-buy-item',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindBuyItemComponent {

  selectedBuyItem: BuyItem[];
  loading: boolean = true;

  formClave: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService
  ) {

    this.formClave = this.inicializarFormularioClave();

    this.trove.getBuyItems().subscribe((response) => {

      this.trove.buyItems = response;
      this.loading = false;
    });
  }

  inicializarFormularioClave(): FormGroup {

    return this.fb.group({
      'clave':         new FormControl("", Validators.required)
    });
  }

  deleteBuyItem(item: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = item.id; 
          this.trove.deleteBuyItem(id);
        }
      },
      reject: () => {return}
    });
  }
}