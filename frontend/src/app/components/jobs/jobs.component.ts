import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { TrabajosService } from '../../services/trabajos.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  toastrService = inject(ToastrService);
  loginService = inject(LoginService);
  trabajosService = inject(TrabajosService);
  nombre: string = '';
  listadoTrabajosArray: any[] = [];
  arrayBusqueda: any[] = [];

  /** CREATE JOB VARIABLES  **/

  nombreTrabajoSubmit: string = '';
  tipoTrabajoSubmit: string = '';
  fechaInicioSubmit: string = '';
  fechaFinTrabajoSubmit: string = '';
  inmediatoTrabajoSubmit: boolean = false;
  salarioTrabajoSubmit: number = 0;
  comisionTrabajoSubmit: number = 0;

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    const decoded = jwtHelperService.decodeToken(token);
    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        if (response.resultado === 'Working') {
          this.nombre = decoded.nombreDeUsuario;
          this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
            if (res.mensaje === 'Datos en la coleccion:') {
              this.listadoTrabajosArray = res.datosParaLeerTodos;
              console.log('res.datos :>> ', res.datosParaLeerTodos);
            } else {
              this.toastrService.error('Error loading');
            }
          });
        } else {
          console.log('Token no válido :>>');
          this.loginService.logout();
        }
      });
    } else {
      console.log('Token no encontrado :>>');
    }
  }

  // searchForm = new FormGroup({
  //   nombreJob: new FormControl('', Validators.required),
  // });

  // handleSubmitSearch() {
  //   const filtered = this.arrayBusqueda.filter((data) => {
  //     return data.nombreTrabajoSubmit === this.searchForm.value.nombreJob;
  //   });
  //   if (filtered.length > 0) {
  //     this.arrayBusqueda = filtered;
  //     this.toastrService.info('Coincidences found: ' + filtered.length);
  //   } else {
  //     this.arrayBusqueda = this.listadoTrabajosArray;
  //     this.toastrService.info(
  //       'Jobs ' + this.searchForm.value.nombreJob + ' not found'
  //     );
  //   }
  // }
  /*
console.log('miDate: ', miDate.toDateString());
console.log('miDate: ', miDate.toLocaleString());
console.log('miDate: ', miDate.toLocaleDateString());
console.log('miDate: ', miDate.toLocaleTimeString());
console.log(Date.now()); */

  /** CREATE JOB **/

  handleSubmitAddJob() {
    const payload = {
      nombreTrabajoSubmit: this.nombreTrabajoSubmit,
      tipoTrabajoSubmit: this.tipoTrabajoSubmit,
      fechaInicioSubmit: this.fechaInicioSubmit,
      fechaFinTrabajoSubmit: this.fechaFinTrabajoSubmit,
      inmediatoTrabajoSubmit: this.inmediatoTrabajoSubmit,
      salarioTrabajoSubmit: this.salarioTrabajoSubmit,
      comisionTrabajoSubmit: this.comisionTrabajoSubmit,
    };
    console.log('payload :>> ', payload);
    this.trabajosService
      .escribirListadoTrabajos(payload)
      .subscribe((res: any) => {
        if (res.mensaje === 'Datos Guardados Trabajos:') {
          this.toastrService.success('Data Saved!');
          function reload() {
            location.reload();
          }
          setTimeout(reload, 500);
        } else {
          this.toastrService.error('Data Not Saved, all fields are required.');
        }
      });
  }

  /** UPDATE JOB **/

  credentialsForm = new FormGroup({
    nombreTrabajoSubmit2: new FormControl('', Validators.required),
    tipoTrabajoSubmitUpdate2: new FormControl('', Validators.required),
    fechaInicioSubmitUpdate2: new FormControl('', Validators.required),
    fechaFinTrabajoSubmitUpdate2: new FormControl('', Validators.required),
    inmediatoTrabajoSubmitUpdate2: new FormControl('', Validators.required),
    salarioTrabajoSubmitUpdate2: new FormControl('', Validators.required),
    comisionTrabajoSubmitUpdate2: new FormControl('', Validators.required),
  });

  handleUpdateJob(id: string) {
    const nombreTrabajoSubmitUpdate2 =
      this.credentialsForm.value.nombreTrabajoSubmit2;
    const tipoTrabajoSubmitUpdate2 =
      this.credentialsForm.value.tipoTrabajoSubmitUpdate2;
    const fechaInicioSubmitUpdate2 =
      this.credentialsForm.value.fechaInicioSubmitUpdate2;
    const fechaFinTrabajoSubmitUpdate2 =
      this.credentialsForm.value.fechaFinTrabajoSubmitUpdate2;
    const inmediatoTrabajoSubmitUpdate2 =
      this.credentialsForm.value.inmediatoTrabajoSubmitUpdate2;
    const salarioTrabajoSubmitUpdate2 =
      this.credentialsForm.value.salarioTrabajoSubmitUpdate2;
    const comisionTrabajoSubmitUpdate2 =
      this.credentialsForm.value.comisionTrabajoSubmitUpdate2;

    const payload = {
      nombreTrabajoSubmit: nombreTrabajoSubmitUpdate2,
      tipoTrabajoSubmit: tipoTrabajoSubmitUpdate2,
      fechaInicioSubmit: fechaInicioSubmitUpdate2,
      fechaFinTrabajoSubmit: fechaFinTrabajoSubmitUpdate2,
      inmediatoTrabajoSubmit: inmediatoTrabajoSubmitUpdate2,
      salarioTrabajoSubmit: salarioTrabajoSubmitUpdate2,
      comisionTrabajoSubmit: comisionTrabajoSubmitUpdate2,
    };
    console.log('payload :>> ', payload);
    this.trabajosService
      .actualizarListadoTrabajos(id, payload)
      .subscribe((res: any) => {
        if (res.mensaje === 'Successfully updated') {
          this.toastrService.success('Data Updated!');
          function reload() {
            location.reload();
          }
          setTimeout(reload, 500);
        } else {
          this.toastrService.error('Data Not Saved, all fields are required.');
        }
      });
  }
  /** DELETE JOB **/

  handleDeleteJob(id: string) {
    this.trabajosService.eliminarListadoTrabajos(id).subscribe((res: any) => {
      this.toastrService.success(res.mensaje);
      this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
        if (res.mensaje === 'Datos en la coleccion:') {
          this.listadoTrabajosArray = res.datosParaLeerTodos;
        } else {
          this.toastrService.error('Error loading');
        }
      });
    });
  }
}
