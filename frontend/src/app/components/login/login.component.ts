import { Component } from '@angular/core';
import { Credential } from '../../interfaces/credentials';
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
    if (this.credentialsForm.valid) {
      const username = this.credentialsForm.value.username;
      const password = this.credentialsForm.value.password;

      if (typeof username === 'string' && typeof password === 'string') {
        const credential: Credential = {
          username,
          password,
        };
        console.log('credendials: ', credential);
      } else {
      }
    } else {
      console.log('Invalid');
    }
  }
}
