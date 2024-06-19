import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  loginService = inject(LoginService);
  nombre: String = '';
  toastrService = inject(ToastrService);

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
