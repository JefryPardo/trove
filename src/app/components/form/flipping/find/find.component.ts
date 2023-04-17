import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Flipping } from 'src/app/model/flipping';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-flipping-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService]
})
export class FindComponent {

  formClave: FormGroup;
  selectedFlipping: Flipping[];

  constructor(
    private fb: FormBuilder, 
    public trove: FirebaseApiService,
    private confirmationService: ConfirmationService,
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

    return !(this.trove.flippings != undefined && this.trove.flippings.length >= 0);
  }

  deleteFlipping(flipping: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = flipping.id; 
          this.trove.deleteFlipping(id);
        }else {
          this.mensaje.mostrarAlertaError("No valido","Password NO valido");
        }
      },
      reject: () => {
          
        
        return;
      }
    });
  }

}
