import { Component, inject } from '@angular/core';
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
  listadoTrabajos: any[] = [];
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
              this.listadoTrabajos = res.datosParaLeerTodos;
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
      this.arrayBusqueda = this.listadoTrabajos;
      this.toastrService.info(
        'Jobs ' + this.searchForm.value.nombreJob + ' not found'
      );
    }
  }
  /*console.log('miDate: ', miDate.getDate());
console.log('miDate: ', miDate.getFullYear());
console.log('miDate: ', miDate.getMonth());
console.log('miDate: ', miDate.getDay());
console.log('miDate: ', miDate.getHours());
console.log('miDate: ', miDate.getMinutes());
console.log('miDate: ', miDate.getSeconds());
console.log('miDate: ', miDate.getMilliseconds());
console.log('miDate: ', miDate.getTime());
console.log('2024-06-19T01:30:43.046Z');
miDate = new Date('2024-06-19T01:30:43.046Z');
console.log('miDate: ', miDate);
console.log('miDate: ', miDate.toString());
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
      });
  }

  // handleInfo() {
  //   console.log('...handleInfo...');
  // }
  // handleUpdate() {
  //   console.log('...handleUpdate...');
  // }
  handleDeleteJob(id: string) {
    this.trabajosService.eliminarListadoTrabajos(id).subscribe((res: any) => {
      this.toastrService.success(res.mensaje);
      this.trabajosService.leerListadoTrabajos().subscribe((res: any) => {
        if (res.mensaje === 'Datos en la coleccion:') {
          this.listadoTrabajos = res.datosParaLeerTodos;
        } else {
          this.toastrService.error('Error loading');
        }
      });
    });
  }
}
