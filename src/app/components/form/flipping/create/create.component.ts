import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Flipping } from 'src/app/model/flipping';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-flipping-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  

  formCreateFlipping: FormGroup;
  buttonDisabled: boolean = false;
  hoy = new Date();

  

  constructor(
    private fb: FormBuilder, 
    public trove: FirebaseApiService,
    private mensaje: ToastService,
    private clipboard: Clipboard
  ){

    this.formCreateFlipping = this.inicializarFormularioFlippin();
  }


  copyText() {
    this.clipboard.copy(this.trove.selectedItemCopy.nombre);
  }
  
  

  inicializarFormularioFlippin(): FormGroup {

    return this.fb.group({
      'id_item':          new FormControl("", Validators.required),
      'precioUnidad':           new FormControl("", Validators.required),
      'cantidad':         new FormControl("", Validators.required),
      'fecha_registro': new FormControl(this.hoy, Validators.required),
    });
  }

  async crearFlipping() {

    if(
      this.formCreateFlipping.value.precioUnidad == undefined    ||
      this.formCreateFlipping.value.cantidad == undefined  ||
      this.formCreateFlipping.value.precioUnidad == null         ||
      this.formCreateFlipping.value.cantidad == null       ||
      this.formCreateFlipping.value.precioUnidad == ''           ||
      this.formCreateFlipping.value.cantidad == ''
    ) {

      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaError(`Campos NO validos`,`Se requiere campos validos`);
      return
    }

    const item: Item  = this.trove.selectedItemCopy;
    
    const fecha       : Date    = this.formCreateFlipping.value.fecha_registro;
    const precioUnidad: number  = this.formCreateFlipping.value.precioUnidad;
    const cantidad    : number  = this.formCreateFlipping.value.cantidad;
    const precioTotal : number  = (cantidad*precioUnidad);

    const flipping: Flipping  = {
      item:         item,
      precioUnidad: precioUnidad,
      precioTotal:  precioTotal,
      cantidad:     cantidad,
      fecha:        fecha.toLocaleString(),
    }

    console.log(flipping);

    await this.trove.createFlipping(flipping);
    this.mensaje.mostrarAlertaSuccess("OK","Se registro el flipping");

    this.formCreateFlipping.reset();
    this.hoy = new Date();
    this.buttonDisabled = false;
  }
}