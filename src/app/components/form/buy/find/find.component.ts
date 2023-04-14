import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { BuyItem } from 'src/app/model/buy.item';
import { Inventory } from 'src/app/model/inventory';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-find-buy-item',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindBuyItemComponent {

  selectedBuyItem: BuyItem[];
  formClave: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

    this.formClave = this.inicializarFormularioClave();
  }

  inicializarFormularioClave(): FormGroup {

    return this.fb.group({
      'clave':         new FormControl("", Validators.required)
    });
  }

  loading() {

    return !(this.trove.buyItems != undefined && this.trove.buyItems.length >= 0);
  }

  deleteBuyItem(buyItem: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = buyItem.item.id;
          let inventario:Inventory | null = this.trove.getByIdItemInventory(id);
          if(inventario == null || inventario == undefined) {
        
            this.mensaje.mostrarAlertaError("Error","El item NO tiene inventario.");
            return;
          };

          inventario.unidades = inventario.unidades - buyItem.cantidad;
          this.trove.updateInventory(inventario);
          this.trove.deleteBuyItem(buyItem.id);
        }else {
          
          this.mensaje.mostrarAlertaError(`No valido`,`Password NO valido`);
        }
      },
      reject: () => {return}
    });
  }
}