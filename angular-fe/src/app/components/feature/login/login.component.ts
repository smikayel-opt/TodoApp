import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, IAuth } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (!this.username || !this.password) return
    this.authService.login({ username: this.username, password: this.password }).subscribe((authRes: IAuth) => {
      localStorage.setItem('token', 'Bearer ' + authRes.token)
    })

    this.router.navigate(['/'])
  }
}
