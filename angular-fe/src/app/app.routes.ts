import { Routes } from '@angular/router';
import { HomeComponent } from './components/feature/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/feature/login/login.component';
import { UploadImageComponent } from './components/shared/upload-image/upload-image.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'upload-images', component: UploadImageComponent }
];
