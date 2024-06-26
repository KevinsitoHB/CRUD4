import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
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

  nombreTrabajoSubmit: string = '';
  tipoTrabajoSubmit: string = '';
  fechaInicioSubmit: string = '';
  fechaFinTrabajoSubmit: string = '';
  inmediatoTrabajoSubmit: boolean = false;
  salarioTrabajoSubmit: number = 0;
  comisionTrabajoSubmit: number = 0;

  nombreTrabajoSubmitUpdate: string = '';
  tipoTrabajoSubmitUpdate: string = '';
  fechaInicioSubmitUpdate: string = '';
  fechaFinTrabajoSubmitUpdate: string = '';
  inmediatoTrabajoSubmitUpdate: boolean = false;
  salarioTrabajoSubmitUpdate: number = 0;
  comisionTrabajoSubmitUpdate: number = 0;

  listadoTrabajosArray: any[] = [];
  arrayBusqueda: any[] = [];

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

  searchForm = new FormGroup({
    nombreJob: new FormControl('', Validators.required),
  });

  handleSubmitSearch() {
    const filtered = this.arrayBusqueda.filter((data) => {
      return data.nombreTrabajoSubmit === this.searchForm.value.nombreJob;
    });
    if (filtered.length > 0) {
      this.arrayBusqueda = filtered;
      this.toastrService.info('Coincidences found: ' + filtered.length);
    } else {
      this.arrayBusqueda = this.listadoTrabajosArray;
      this.toastrService.info(
        'Jobs ' + this.searchForm.value.nombreJob + ' not found'
      );
    }
  }
  /*
console.log('miDate: ', miDate.toDateString());
console.log('miDate: ', miDate.toLocaleString());
console.log('miDate: ', miDate.toLocaleDateString());
console.log('miDate: ', miDate.toLocaleTimeString());
console.log(Date.now()); */

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
      .subscribe((response: any) => {
        console.log('response :>> ', response);
        if (response.mensaje === 'Datos Guardados Trabajos:') {
          this.toastrService.success('Data Saved!');
          function reload() {
            location.reload();
          }
          setTimeout(reload, 1000);
        } else {
          this.toastrService.error('Data Not Saved, all fields are required.');
        }
      });
  }

  // handleInfo() {
  //   console.log('...handleInfo...');
  // }
  handleUpdateJob(id: string) {
    const payload = {
      nombreTrabajoSubmitUpdate: this.nombreTrabajoSubmitUpdate,
      tipoTrabajoSubmitUpdate: this.tipoTrabajoSubmitUpdate,
      fechaInicioSubmitUpdate: this.fechaInicioSubmitUpdate,
      fechaFinTrabajoSubmitUpdate: this.fechaFinTrabajoSubmitUpdate,
      inmediatoTrabajoSubmitUpdate: this.inmediatoTrabajoSubmitUpdate,
      salarioTrabajoSubmitUpdate: this.salarioTrabajoSubmitUpdate,
      comisionTrabajoSubmitUpdate: this.comisionTrabajoSubmitUpdate,
    };
    console.log('AQUI PAYLOAD :>> ', payload);
    this.trabajosService
      .actualizarListadoTrabajos(id, payload)
      .subscribe((res: any) => {
        console.log('AQUI :>> ');
      });
  }

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
