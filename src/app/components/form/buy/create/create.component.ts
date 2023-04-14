import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BuyItem } from 'src/app/model/buy.item';
import { Inventory } from 'src/app/model/inventory';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-create-buy-item',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBuyItemComponent {

  formBuyItem: FormGroup;
  hoy = new Date();
  selectedItem: Item;
  buttonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder, 
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

    this.formBuyItem = this.inicializarFormularioBuyItem();
  }

  inicializarFormularioBuyItem(): FormGroup {

    return this.fb.group({
      'id_item':        new FormControl("", Validators.required),
      'fecha_registro': new FormControl(this.hoy, Validators.required),
      'precio':         new FormControl("", Validators.required),
      'cantidad':       new FormControl("", Validators.required),
      'precio_unidad':  new FormControl("", Validators.required),
    });
  }

  async crearBuyItem() {
    this.buttonDisabled = true;
    if(
      this.formBuyItem.value.id_item != undefined &&
      this.formBuyItem.value.id_item != null &&
      this.formBuyItem.value.id_item != '' &&
      this.formBuyItem.value.fecha_registro != undefined &&
      this.formBuyItem.value.fecha_registro != '' &&
      this.formBuyItem.value.fecha_registro != null &&
      this.formBuyItem.value.precio != null &&
      this.formBuyItem.value.precio != '' &&
      this.formBuyItem.value.precio != null &&
      this.formBuyItem.value.cantidad != undefined  &&
      this.formBuyItem.value.cantidad != null  &&
      this.formBuyItem.value.cantidad != ''
    ){

      const fecha:Date = this.formBuyItem.value.fecha_registro;

      let preciounidad = 0;
      if(this.formBuyItem.value.precio > 0){
        preciounidad = this.formBuyItem.value.precio/this.formBuyItem.value.cantidad;
      }

      const buyItem: BuyItem  = {

        item:             this.formBuyItem.value.id_item,
        fechaRegistro:    fecha.toLocaleString(),
        precio:           this.formBuyItem.value.precio,
        cantidad:         this.formBuyItem.value.cantidad,
        precioUnidad:     preciounidad    
      }

      let inventario:Inventory | null = this.trove.getByIdItemInventory(this.formBuyItem.value.id_item.id);
      if(inventario == null || inventario == undefined) {
        
        this.mensaje.mostrarAlertaError("Error","El item NO tiene inventario.");
        this.buttonDisabled = false;
        return;
      };
      
      if(inventario.unidades + buyItem.cantidad > inventario.stock_maximo) {
      
        this.mensaje.mostrarAlertaError(`Stock superado: ${inventario.stock_maximo}`,`Stock actual: ${inventario.unidades}`);
        this.buttonDisabled = false;
        return
      };

      inventario.unidades = inventario.unidades + buyItem.cantidad;
      
      await this.trove.createBuyItem(buyItem);
      
      this.trove.updateInventory(inventario);
      
      this.formBuyItem.reset();
      this.hoy = new Date();
      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaSuccess(`OK`,`Registro creado`);
    }else {
      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaError("Campos no validos","Se requiere campos validos");
    }


  }
}