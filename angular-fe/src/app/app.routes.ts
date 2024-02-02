import { Routes } from '@angular/router';
import { HomeComponent } from './components/feature/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/feature/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];
