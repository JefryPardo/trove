import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  formCalculator: FormGroup;
  formCalculatorVenta: FormGroup;
  impuestos: number = 0.1;  
  precio_unidad: number;
  cantidad: number;
  taxa_fija: number;
  unidades_venta: number;
  precio_unidad_venta: number;
  precio_total_venta: number;
  precio_total_venta_menos_impuestos: number;
  precio_total_publicaciones: number;
  nro_publicaciones: number;
  calculo_total: number;
  ganancia: number;
  ver_calculo_total: boolean = false;

  ver_precio_mas_impuesto: boolean = false;
  total_precio: number;
  total_precio_mas_impuesto: number;

  constructor(
    private fb: FormBuilder, 
  ) {

    this.formCalculator = this.inicializarFormularioCalculator();
    this.formCalculatorVenta = this.inicializarFormularioCalculatorVenta();
  }

  inicializarFormularioCalculator(): FormGroup {

    return this.fb.group({
      'cantidad':         new FormControl("",       Validators.required),
      'precio_unidad':  new FormControl("",       Validators.required),
    });
  }
  
  inicializarFormularioCalculatorVenta(): FormGroup {

    return this.fb.group({
      'taxa_fija':                new FormControl(50,       Validators.required),
      'unidades_venta':            new FormControl("",       Validators.required),
      'precio_unidad_venta':       new FormControl("",       Validators.required),
    });
  }

  calcular() {

    if(
      this.formCalculator.value.cantidad == undefined ||
      this.formCalculator.value.cantidad == null ||
      this.formCalculator.value.cantidad == '' ||
      this.formCalculator.value.precio_unidad == undefined ||
      this.formCalculator.value.precio_unidad == null ||
      this.formCalculator.value.precio_unidad == ''
    ) {

      return;
    }

    this.precio_unidad   = this.formCalculator.value.precio_unidad;
    this.cantidad        = this.formCalculator.value.cantidad;
    
    this.total_precio = this.precio_unidad*this.cantidad;
    let impuestos = this.total_precio*this.impuestos;
    
    this.total_precio_mas_impuesto = this.total_precio+impuestos;
    
    this.ver_precio_mas_impuesto = true;
  }
  
  calcularVenta() {
    
    if(
      this.formCalculatorVenta.value.taxa_fija == null          ||
      this.formCalculatorVenta.value.taxa_fija == ''            ||
      this.formCalculatorVenta.value.taxa_fija == undefined     ||
      this.formCalculatorVenta.value.precio_unidad_venta == null      ||
      this.formCalculatorVenta.value.precio_unidad_venta == ''        ||
      this.formCalculatorVenta.value.precio_unidad_venta == undefined || 
      this.formCalculatorVenta.value.unidades_venta == null      ||
      this.formCalculatorVenta.value.unidades_venta == ''        ||
      this.formCalculatorVenta.value.unidades_venta == undefined
    ) {
        
      return;
    }
    
    this.unidades_venta       = this.formCalculatorVenta.value.unidades_venta;
    this.taxa_fija            = this.formCalculatorVenta.value.taxa_fija;
    this.precio_unidad_venta  = this.formCalculatorVenta.value.precio_unidad_venta;


    this.nro_publicaciones = (this.cantidad/this.unidades_venta);

    this.precio_total_publicaciones = this.nro_publicaciones*this.taxa_fija;

    this.precio_total_venta = this.precio_unidad_venta*this.unidades_venta;

    let impuesto = this.precio_total_venta* this.impuestos;

    this.precio_total_venta_menos_impuestos = this.precio_total_venta-impuesto;
    this.precio_total_venta_menos_impuestos = this.precio_total_venta_menos_impuestos - this.taxa_fija;
    this.calculo_total = this.precio_total_venta_menos_impuestos*this.nro_publicaciones;

    this.ganancia = this.calculo_total - this.total_precio_mas_impuesto;

    this.ver_calculo_total = true;
  }
}
