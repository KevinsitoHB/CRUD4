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
  nombreTrabajoSubmit: string = '';
  tipoTrabajo: string = '';
  fechaInicioTrabajo: Date = new Date();
  fechaFinTrabajo: Date = new Date();
  inicioInmediatoTrabajo: Boolean = false;
  salarioTrabajo: any;
  comisionTrabajo: any;

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

  handleSubmitAddJob() {
    this.trabajosService
      .AddJob(
        this.nombreTrabajoSubmit,
        this.tipoTrabajo,
        this.fechaInicioTrabajo,
        this.fechaFinTrabajo,
        this.inicioInmediatoTrabajo,
        this.salarioTrabajo,
        this.comisionTrabajo
      )
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
  // handleDelete(id: string) {
  //   this.trabajosService.deleteCap(id).subscribe((res: any) => {
  //     if (res.resultado === 'bien') {
  //       this.toastrService.success(res.mensaje);
  //       this.trabajosService.getCaps().subscribe((res: any) => {

  //       });
  //     } else {
  //       this.toastrService.error('An error ocurred');
  //     }
  //   });
  // }
}
