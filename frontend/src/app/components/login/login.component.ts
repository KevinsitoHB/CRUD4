import { Component, inject } from '@angular/core';
import { Credential } from '../../interfaces/credentials';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  loginService: LoginService = inject(LoginService);
  credentialsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.credentialsForm.valid) {
      const username1 = this.credentialsForm.value.username;
      const password1 = this.credentialsForm.value.password;

      if (typeof username1 === 'string' && typeof password1 === 'string') {
        const credential: Credential = {
          usernameUsuarioEsquema: username1,
          passwordUsuarioEsquema: password1,
        };
        this.loginService.login(credential).subscribe((response: any) => {
          console.log('response :>> ', response);
          const decoded = jwtHelperService.decodeToken(response.token.token);
          console.log('decoded :>> ', decoded);
          localStorage.setItem('token', response.token.token);
          this.router.navigateByUrl('/jobs');
        });
      } else {
        console.log('Invalid Form 1');
      }
    } else {
      console.log('Invalid Form 2');
    }
  }
}
