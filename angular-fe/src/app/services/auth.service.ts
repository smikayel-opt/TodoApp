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
  API_URL = 'http://localhost:5000/api/'
  loggedIn: boolean = false;

  constructor(public http: HttpClient) { }

  /**
   * will auth the provided user
   * @param user user conditionals username, and password for the authentication
   * @returns the Observable<IAuth>
   */
  login(user: IUser): Observable<IAuth> {
    return this.http.post<IAuth>(this.API_URL + 'login', user)
  }

  /**
   * will take the token from the local storage
   * @returns the token 
   */
  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }

  /**
   * will check is the user already authenticated or no
   * @returns boolean: isLoggedIn true if already authenticated false if not authenticated 
   */
  isLoggedIn() {
    const token = this.getTokenFromLocalStorage()
    if (token) {
      this.loggedIn = true
    }
    return this.loggedIn;
  }
}
