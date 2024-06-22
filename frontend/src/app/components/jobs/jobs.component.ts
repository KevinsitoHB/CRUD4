import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  loginService = inject(LoginService);
  nombre: String = '';
  toastrService = inject(ToastrService);
  addJobForm = new FormGroup({
    nombreTrabajo: new FormControl('', Validators.required),
    tipoTrabajo: new FormControl('', Validators.required),
    fechaInicioTrabajo: new FormControl('', Validators.required),
    fechaFinalizacionTrabajo: new FormControl('', Validators.required),
    inicioInmediatoTrabajo: new FormControl('', Validators.required),
    salarioTrabajo: new FormControl('', Validators.required),
    comisionTrabajo: new FormControl('', Validators.required),
  });
  handleSubmitAddJob() {
    if (this.addJobForm.valid) {
      const nombreTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      const tipoTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      const fechaInicioSubmit = this.addJobForm.value.nombreTrabajo;
      const fechaFinTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      const disponibilidadTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      const salarioTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      const comisionTrabajoSubmit = this.addJobForm.value.nombreTrabajo;
      if (typeof nombreTrabajoSubmit === 'string') {
      } else {
      }
    } else {
      console.log('Invalid form :>> ');
    }
  }
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    const decoded = jwtHelperService.decodeToken(token);
    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        if (response.resultado === 'Working') {
          this.nombre = decoded.nombreDeUsuario;
          // this.toastrService.success(`Welcome back ${this.nombre}!`);
        } else {
          console.log('Token no válido :>>');
          this.loginService.logout();
        }
      });
    } else {
      console.log('Token no encontrado :>>');
    }
  }
}
