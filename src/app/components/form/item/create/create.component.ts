import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inventory } from 'src/app/model/inventory';
import { Item } from 'src/app/model/item';
import { FirebaseApiService } from 'src/app/service/firebase.api.service';
import { ToastService } from 'src/app/service/toast.service';

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
  buttonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private trove: FirebaseApiService,
    private mensaje: ToastService
  ) {

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

    this.buttonDisabled = true;
    if(
      this.formItem.value.nombre == undefined       ||
      this.formItem.value.tipo.nombre == undefined  ||
      this.formItem.value.tipo.nombre == null       ||
      this.formItem.value.tipo.nombre == ''         ||
      this.formItem.value.nombre == ''              ||
      this.formItem.value.nombre == null            ||
      this.formItem.value.unidades == null          ||  
      this.formItem.value.unidades == null          ||
      this.formItem.value.unidades == undefined     ||
      this.formItem.value.unidades == undefined     ||
      this.formItem.value.unidades.length <= 0       ||
      this.formItem.value.stock == null             ||
      this.formItem.value.stock == null             ||
      this.formItem.value.stock == undefined        ||
      this.formItem.value.stock == undefined        ||
      this.formItem.value.stock == ''               ||
      this.formItem.value.stock == ''               
    ) {
    
      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaError(`Campos NO validos`,`Se requiere campos validos`);
      return
    }
    
    if(!this.validarExistenciaItem()) {
      
      this.buttonDisabled = false;
      this.mensaje.mostrarAlertaError("El item ya existe","Ingrese otro nombre");
      return
    };
    
    const item: Item  = {
      nombre: this.formItem.value.nombre.trim(),
      tipo:   this.formItem.value.tipo.nombre.trim()
    }
    
    let itemSave = await this.trove.createItem(item);
    item.id = itemSave.id;
    
    const inventory: Inventory  = {
      item:         item,
      unidades:     this.formItem.value.unidades,
      stock_maximo: this.formItem.value.stock
    }
    
    this.formItem.reset();
    await this.trove.createInventario(inventory);
    this.buttonDisabled = false;
    this.mensaje.mostrarAlertaSuccess("OK","Se registro el item");
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
