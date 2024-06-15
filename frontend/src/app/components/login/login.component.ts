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
import { ToastrService } from 'ngx-toastr';

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
  toastrService = inject(ToastrService);
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
          const decoded = jwtHelperService.decodeToken(response.token.token);
          if (response.result === 'Working') {
            localStorage.setItem('token', response.token.token);
            this.router.navigateByUrl('/jobs');
          } else {
            console.log('Invalid Form 0', response);
            this.toastrService.warning('Invalid form');
          }
        });
      } else {
        console.log('Invalid Form 1');
        this.toastrService.warning('Invalid form');
      }
    } else {
      console.log('Invalid Form: empty fields');
      this.toastrService.warning('Empty form fields');
    }
  }
}
