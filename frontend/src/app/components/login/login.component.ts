import { Component, inject } from '@angular/core';
import { Credential } from '../../interfaces/credentials';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
// import { Router } from 'express';
// import { JwtHelperService } from '@auth0/angular-jwt';

// const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // router = inject(Router);
  loginService: LoginService = inject(LoginService);
  credentialsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.credentialsForm.valid) {
      const username = this.credentialsForm.value.username;
      const password = this.credentialsForm.value.password;

      if (typeof username === 'string' && typeof password === 'string') {
        const credential: Credential = {
          username,
          password,
        };
        this.loginService.login(credential).subscribe((response: any) => {
          console.log(response);
        });
        // console.log('credendials: ', credential);
      } else {
      }
    } else {
      console.log('Invalid Form');
    }
  }
}
