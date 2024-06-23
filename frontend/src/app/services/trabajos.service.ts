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
    inmediatoTrabajoSubmit: any,
    salarioTrabajoSubmit: any,
    comisionTrabajoSubmit: any
  ) {
    //CREAR INSTANCIA DE LA CLASE
    const formData = new FormData();
    //NOMBRE QUE LE DARE Y DATO QUE SE PASA
    formData.append('nombreTrabajoSubmit', nombreTrabajoSubmit);
    formData.append('tipoTrabajoSubmit', tipoTrabajoSubmit);
    formData.append('fechaInicioSubmit', fechaInicioSubmit);
    formData.append('fechaFinTrabajoSubmit', fechaFinTrabajoSubmit);
    formData.append('inmediatoTrabajoSubmit', inmediatoTrabajoSubmit);
    formData.append('salarioTrabajoSubmit', salarioTrabajoSubmit);
    formData.append('comisionTrabajoSubmit', comisionTrabajoSubmit);
    console.log('formData :>> ', formData);
    return this.httpClient.post(this.API_URL, formData);
  }
}

/**  getCaps() {
    return this.httpClient.get(this.API_URL);
  }

  deleteCap(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
} */
