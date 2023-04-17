import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-search-flipping-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FlippingSearchFindComponent {

  selectedItem: Item;
  formFindItem: FormGroup;
  buttonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder, 
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

    this.formFindItem = this.inicializarFormularioFindItem();
  }

  inicializarFormularioFindItem(): FormGroup {

    return this.fb.group({
      'id_item':        new FormControl("", Validators.required)
    });
  }

  findItem() {

    if(
      this.formFindItem.value.id_item == undefined ||
      this.formFindItem.value.id_item == null ||
      this.formFindItem.value.id_item == '' 
    ) {

      this.mensaje.mostrarAlertaError('Item','Se requiere un item valido.')
    }
    
    const item: Item = this.formFindItem.value.id_item;

    this.trove.flipping(item);
  }
}
