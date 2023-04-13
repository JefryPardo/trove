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
      { nombre: 'Allies' },
      { nombre: 'Building' },
      { nombre: 'Costumes' },
      { nombre: 'Crafting' },
      { nombre: 'Emblems' },
      { nombre: 'Fishing Poles' },
      { nombre: 'Flasks' },
      { nombre: 'Items' },
      { nombre: 'Mag Riders' },
      { nombre: 'Mounts' },
      { nombre: 'Recipes' },
      { nombre: 'Sails' },
      { nombre: 'Ships' },
      { nombre: 'Tomes' },
      { nombre: 'Wings' }
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
    
    if(!this.validarExistenciaItem()) return;
    
    const item: Item  = {
      nombre: this.formItem.value.nombre.trim(),
      tipo:   this.formItem.value.tipo.nombre.trim()
    }

    this.formItem.reset();
    await this.trove.createItem(item);
  }

  validarExistenciaItem() {

    let bandera = true;
    this.trove.items.forEach(element => {
      
      if(this.formItem.value.tipo.nombre.toUpperCase().trim() == element.tipo.toUpperCase().trim()  && this.formItem.value.nombre.toUpperCase().trim() == element.nombre.toUpperCase().trim()) {

        bandera = false;
        return;
      } 
    });

    return bandera;
  }
}
