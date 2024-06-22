import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { TrabajosService } from '../../services/trabajos.service';
const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  loginService = inject(LoginService);
  toastrService = inject(ToastrService);
  trabajosService = inject(TrabajosService);
  nombre: string = '';
  nombreTrabajo: string = '';
  tipoTrabajo: string = '';
  fechaInicioTrabajo: string = '';
  fechaFinTrabajo: string = '';
  inicioInmediatoTrabajo: Boolean = false;
  salarioTrabajo: Number = 0;
  comisionTrabajo: Number = 0;

  handleSubmitAddJob() {
    this.trabajosService.AddJob(
      this.nombreTrabajo,
      this.tipoTrabajo,
      this.fechaInicioTrabajo,
      this.fechaFinTrabajo,
      this.inicioInmediatoTrabajo,
      this.salarioTrabajo,
      this.comisionTrabajo
    );
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
