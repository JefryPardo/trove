import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-find-create',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FindItemComponent implements OnInit {

  
  selectedItem: Item[];
  formClave: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    public trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

    this.formClave = this.inicializarFormularioClave();
  }
    
  
  ngOnInit() {}
  
  loading() {

    return !(this.trove.items != undefined && this.trove.items.length >= 0);
  }

  deleteItem(item: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = item.id; 
          this.trove.deleteItem(id);
        }else {
          this.mensaje.mostrarAlertaError("No valido","Password NO valido");
        }
      },
      reject: () => {
          
        
        return;
      }
    });
  }

  inicializarFormularioClave(): FormGroup {

    return this.fb.group({
      'clave':         new FormControl("", Validators.required)
    });
  }

}
