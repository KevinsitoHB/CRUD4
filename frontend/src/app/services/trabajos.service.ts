import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  constructor() {}
  httpClient = inject(HttpClient);

  API_URL = 'http://localhost:3000/jobs';
  AddJob(
    nombreTrabajoSubmit: any,
    tipoTrabajoSubmit: any,
    fechaInicioSubmit: any,
    fechaFinTrabajoSubmit: any,
    inicioInmediatoTrabajoSubmit: any,
    salarioTrabajoSubmit: any,
    comisionTrabajoSubmit: any
  ) {
    const formData = new FormData(); //CREAR INSTANCIA DE LA CLASE
    formData.append('nombreTrabajoSubmit', nombreTrabajoSubmit); //NOMBRE QUE LE DARE Y DATO QUE SE PASA
    formData.append('tipoTrabajoSubmit', tipoTrabajoSubmit);
    formData.append('fechaInicioSubmit', fechaInicioSubmit);
    formData.append('fechaFinTrabajoSubmit', fechaFinTrabajoSubmit);
    formData.append(
      'inicioInmediatoTrabajoSubmit',
      inicioInmediatoTrabajoSubmit
    );
    formData.append('salarioTrabajoSubmit', salarioTrabajoSubmit);
    formData.append('comisionTrabajoSubmit', comisionTrabajoSubmit);
    return this.httpClient.post(this.API_URL, formData);
  }
}
