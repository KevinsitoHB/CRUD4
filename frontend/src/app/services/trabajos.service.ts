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
    return this.httpClient.post(this.API_URL, payload);
  }
  leerListadoTrabajos() {
    return this.httpClient.get(this.API_URL);
  }
  actualizarListadoTrabajos(id: string, payload: any) {
    return this.httpClient.put(`${this.API_URL}/${id}`, { payload });
  }

  eliminarListadoTrabajos(id: string) {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}
