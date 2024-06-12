import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../services/login.service';

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

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    const decoded = jwtHelperService.decodeToken(token);
    console.log('Decoded nombre usuario JOBS :>> ', decoded.nombreDeUsuario);

    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        console.log('Response onInit :>> ', response);

        if (response.resultado === 'Working') {
          this.nombre = decoded.nombreDeUsuario;
        } else {
          console.log('Token no válido :>>');
        }
      });
    } else {
      console.log('Token no encontrado :>>');
    }
  }
}
