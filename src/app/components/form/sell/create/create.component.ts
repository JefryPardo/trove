import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/model/item';
import { SellItem } from 'src/app/model/sell.item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-create-sell-item',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateSellItemComponent {

  formSellItem: FormGroup;
  hoy = new Date();
  selectedItem: Item;

  constructor(private fb: FormBuilder, public trove: FirebaseApiService) {

    this.formSellItem = this.inicializarFormularioSellItem();

    this.trove.getItems().subscribe(response => {
      
      this.trove.items = response;
    });
  }

  inicializarFormularioSellItem(): FormGroup {

    return this.fb.group({
      'id_item':        new FormControl("", Validators.required),
      'fecha_registro': new FormControl(this.hoy, Validators.required),
      'precio':         new FormControl("", Validators.required),
      'cantidad':       new FormControl("", Validators.required),
      'precio_unidad':  new FormControl("", Validators.required),
    });
  }

  async crearSellItem() {

    if(
      this.formSellItem.value.id_item != undefined &&
      this.formSellItem.value.id_item != null &&
      this.formSellItem.value.id_item != '' &&
      this.formSellItem.value.fecha_registro != undefined &&
      this.formSellItem.value.fecha_registro != '' &&
      this.formSellItem.value.fecha_registro != null &&
      this.formSellItem.value.precio != null &&
      this.formSellItem.value.precio != '' &&
      this.formSellItem.value.precio != null &&
      this.formSellItem.value.cantidad != undefined  &&
      this.formSellItem.value.cantidad != null  &&
      this.formSellItem.value.cantidad != ''
    ){

      const fecha:Date = this.formSellItem.value.fecha_registro;

      const sellItem: SellItem  = {

        item:             this.formSellItem.value.id_item,
        fechaRegistro:    fecha.toLocaleString(),
        precio:           this.formSellItem.value.precio,
        cantidad:         this.formSellItem.value.cantidad,
        precioUnidad:     this.formSellItem.value.precio/this.formSellItem.value.cantidad
      }

      this.formSellItem.reset();
      this.hoy = new Date();

      await this.trove.createSellItem(sellItem);
    }
  }
    
}