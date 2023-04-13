import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inventory } from 'src/app/model/inventory';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';

interface TipoItem {
  nombre: string;
}

@Component({
  selector: 'app-create-item',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateItemComponent {

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
      'tipo':           new FormControl("", Validators.required),
      'unidades':       new FormControl("", Validators.required),
      'stock':          new FormControl("", Validators.required)
    });
  }

  async crearItem() {

    
    if(this.formItem.value.nombre == undefined) return;
    if(this.formItem.value.tipo.nombre == undefined) return;
    if(this.formItem.value.nombre == '') return;
    if(this.formItem.value.tipo.nombre == '') return;
    if(this.formItem.value.nombre == null) return;
    if(this.formItem.value.tipo.nombre == null) return;

    if(this.formItem.value.unidades == null) return;
    if(this.formItem.value.unidades == null) return;
    if(this.formItem.value.unidades == undefined) return;
    if(this.formItem.value.unidades == undefined) return;
    if(this.formItem.value.unidades == '') return;
    if(this.formItem.value.unidades == '') return;
    
    if(this.formItem.value.stock == null) return;
    if(this.formItem.value.stock == null) return;
    if(this.formItem.value.stock == undefined) return;
    if(this.formItem.value.stock == undefined) return;
    if(this.formItem.value.stock == '') return;
    if(this.formItem.value.stock == '') return;
    
    
    
    if(!this.validarExistenciaItem()) return;
    
    const item: Item  = {
      nombre: this.formItem.value.nombre.trim(),
      tipo:   this.formItem.value.tipo.nombre.trim()
    }
    
    const inventory: Inventory  = {
      item:         item,
      unidades:     this.formItem.value.unidades,
      stock_maximo: this.formItem.value.stock
    }



    this.formItem.reset();
    await this.trove.createItem(item);
    await this.trove.createInventario(inventory);
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
