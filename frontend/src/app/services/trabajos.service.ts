import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrabajosService {
  constructor() {}
  httpClient = inject(HttpClient);

  API_URL = 'http://localhost:3000/jobs';

  escribirListadoTrabajos(payload: any) {
    //CREAR INSTANCIA DE LA CLASE
    // const formData = new FormData();
    //NOMBRE QUE LE DARÉ Y DATO QUE SE PASA
    // formData.append('nombreTrabajoSubmit', nombreTrabajoSubmit);
    // formData.append('tipoTrabajoSubmit', tipoTrabajoSubmit);
    // formData.append('fechaInicioSubmit', fechaInicioSubmit);
    // formData.append('fechaFinTrabajoSubmit', fechaFinTrabajoSubmit);
    // formData.append('inmediatoTrabajoSubmit', inmediatoTrabajoSubmit);
    // formData.append('salarioTrabajoSubmit', salarioTrabajoSubmit);
    // formData.append('comisionTrabajoSubmit', comisionTrabajoSubmit);
    return this.httpClient.post(this.API_URL, payload);
  }
  leerListadoTrabajos() {
    return this.httpClient.get(this.API_URL);
  }
  actualizarListadoTrabajos() {}

  eliminarListadoTrabajos(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
