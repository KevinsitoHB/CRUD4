import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  nombre: String = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    console.log('El token es: ', token);
    const decoded = jwtHelperService.decodeToken(token);
    console.log('Decoded :>> ', decoded);
    this.nombre = decoded.nombreDeUsuario;
  }
}
