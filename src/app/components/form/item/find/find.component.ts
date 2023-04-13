import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

@Component({
  selector: 'app-find-create',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class FindItemComponent {

  
  selectedItem: Item[];
  loading: boolean = true;

  formClave: FormGroup;

  constructor(private confirmationService: ConfirmationService,private fb: FormBuilder,public trove: FirebaseApiService) {

    this.formClave = this.inicializarFormularioClave();

    this.trove.getItems().subscribe(response => {
      
      this.trove.items = response;
      this.loading = false;
    });
  }
  
  deleteItem(item: any) {

    this.confirmationService.confirm({
      accept: () => {
        
        if(this.formClave.value.clave != undefined && this.formClave.value.clave != '' && this.formClave.value.clave == 'sol123') {
          
          this.formClave.reset();

          let id: string = item.id; 
          this.trove.deleteItem(id);
        }
      },
      reject: () => {
          
        console.log('Salir');
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
