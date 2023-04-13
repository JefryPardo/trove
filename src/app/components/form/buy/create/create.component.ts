import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyItem } from 'src/app/model/buy.item';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-create-buy-item',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateBuyItemComponent {

  formBuyItem: FormGroup;
  hoy = new Date();
  selectedItem: Item;

  constructor(private fb: FormBuilder, public trove: FirebaseApiService) {

    this.formBuyItem = this.inicializarFormularioBuyItem();

    this.trove.getItems().subscribe(response => {
      
      this.trove.items = response;
    });
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

    console.log(this.formBuyItem.value);

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

      console.log('entra');

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

      this.formBuyItem.reset();
      this.hoy = new Date();

      await this.trove.createBuyItem(buyItem);
    }
  }
}