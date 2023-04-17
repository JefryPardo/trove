import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  mostrarAlertaSuccess(mensajeError: string, detalleError: string) {

    this.messageService.add(

      {severity:'success', summary: mensajeError, detail: detalleError}
    );
  }

  mostrarAlertaError(mensajeError: string, detalleError: string) {

    this.messageService.add(

      {severity:'error', summary: mensajeError, detail: detalleError}
    );
  }

  mostrarAlertaWarn(mensajeError: string, detalleError: string) {

    this.messageService.add(

      {severity:'warn', summary: mensajeError, detail: detalleError}
    );
  }
}
