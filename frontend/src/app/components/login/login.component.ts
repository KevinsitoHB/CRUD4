import { Component } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentialsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  handleSubmit() {
    if (this.credentialsForm) {
      console.log(this.credentialsForm);
      const username = this.credentialsForm.value.username;
      const password = this.credentialsForm.value.password;

      if (typeof username === 'string' && typeof password === 'string') {
        const credential: Credentials = {
          username,
          password,
        };
        console.log(credential);
      } else {
      }
    } else {
      console.log('ERROR');
    }
  }
}
