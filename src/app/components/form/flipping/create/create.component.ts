import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Flipping } from 'src/app/model/flipping';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-flipping-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  selectedItem: Item;
  formCreateFlipping: FormGroup;
  buttonDisabled: boolean = false;
  hoy = new Date();

  constructor(
    private fb: FormBuilder, 
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ){

    this.formCreateFlipping = this.inicializarFormularioFlippin();
  }

  inicializarFormularioFlippin(): FormGroup {

    return this.fb.group({
      'id_item':          new FormControl("", Validators.required),
      'precio':           new FormControl("", Validators.required),
      'cantidad':         new FormControl("", Validators.required),
      'fecha_registro': new FormControl(this.hoy, Validators.required),
    });
  }

  async crearFlipping() {

    if(
      this.formCreateFlipping.value.id_item == undefined   ||
      this.formCreateFlipping.value.precio == undefined    ||
      this.formCreateFlipping.value.cantidad == undefined  ||
      this.formCreateFlipping.value.id_item == null        ||
      this.formCreateFlipping.value.precio == null         ||
      this.formCreateFlipping.value.cantidad == null       ||
      this.formCreateFlipping.value.id_item == ''          ||
      this.formCreateFlipping.value.precio == ''           ||
      this.formCreateFlipping.value.cantidad == ''
    ) {

      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaError(`Campos NO validos`,`Se requiere campos validos`);
      return
    }

    const item: Item  = {
      id: this.formCreateFlipping.value.id_item.id,
      nombre: this.formCreateFlipping.value.id_item.nombre,
      tipo:   this.formCreateFlipping.value.id_item.tipo
    }
    
    const fecha:Date = this.formCreateFlipping.value.fecha_registro;

    const flipping: Flipping  = {
      item:       item,
      precio:     this.formCreateFlipping.value.precio,
      cantidad:   this.formCreateFlipping.value.cantidad,
      fecha:      fecha.toLocaleString(),
    }

    await this.trove.createFlipping(flipping);
    this.mensaje.mostrarAlertaSuccess("OK","Se registro el flipping");

    this.formCreateFlipping.reset();
    this.hoy = new Date();
    this.buttonDisabled = false;
  }
}