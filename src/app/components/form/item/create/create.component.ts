import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

interface TipoItem {
  nombre: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  tipo: TipoItem[];
  formItem: FormGroup;

  constructor(private fb: FormBuilder, private trove: FirebaseApiService) {

    this.formItem = this.inicializarFormularioItem();

    this.tipo = [
      { nombre: 'Montura' },
      { nombre: 'Alas' }
    ];
  }

  inicializarFormularioItem(): FormGroup {

    return this.fb.group({
      'nombre':         new FormControl("", Validators.required),
      'tipo':           new FormControl("", Validators.required)
    });
  }

  async crearItem() {

    
    if(this.formItem.value.nombre == undefined) return;
    if(this.formItem.value.tipo.nombre == undefined) return;
    
    const item: Item  = {
      nombre: this.formItem.value.nombre,
      tipo:   this.formItem.value.tipo.nombre
    }

    await this.trove.createItem(item);
  }
}
