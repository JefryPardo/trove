import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Inventory } from 'src/app/model/inventory';
import { SellItem } from 'src/app/model/sell.item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-find-sell-item',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindSellItemComponent {

  selectedSellItem: SellItem[];

  formClave: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

    this.formClave = this.inicializarFormularioClave();
  }

  loading() {

    return !(this.trove.sellItems != undefined && this.trove.sellItems.length >= 0);
  }

  deleteSellItem(sellItem: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = sellItem.item.id; 
          let inventario:Inventory | null = this.trove.getByIdItemInventory(id);
          if(inventario == null || inventario == undefined) {
        
            this.mensaje.mostrarAlertaError("Error","El item NO tiene inventario.");
            return;
          };

          inventario.unidades = inventario.unidades + sellItem.cantidad;
          this.trove.updateInventory(inventario);
          this.trove.deleteSellItem(id);
        }else {

          this.mensaje.mostrarAlertaError("Password","Password NO valido");
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