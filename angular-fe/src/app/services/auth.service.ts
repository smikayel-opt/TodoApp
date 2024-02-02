import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  username: string
  password: string
}

export interface IAuth {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://localhost:5000/'

  loggedIn: boolean = false;
  constructor(public http: HttpClient) { }

  login(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(this.API_URL + 'login', user)
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }

  isLoggedIn() {
    const token = this.getTokenFromLocalStorage()
    if (token) {
      this.loggedIn = true
    }
    return this.loggedIn;
  }

}