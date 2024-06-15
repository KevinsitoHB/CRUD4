import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../interfaces/credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  httpClient = inject(HttpClient);
  API_URL = 'http://localhost:3000/inicio-sesion';
  router = inject(Router);

  login(credential: Credential) {
    return this.httpClient.post(this.API_URL, credential);
  }

  validateToken(token: String) {
    return this.httpClient.get(`${this.API_URL}/${token}`);
  }

  isLogged() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      console.log('Is not Logged in :>> ');
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
}
