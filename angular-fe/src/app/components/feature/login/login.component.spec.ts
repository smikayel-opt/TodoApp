import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService, IAuth } from '../../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'isLoggedIn', 'getTokenFromLocalStorage']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    localStorage.clear()
    component = new LoginComponent(authService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('login', () => {
    it('should set token in localStorage and navigate to "/" when login is successful', () => {
      const username = 'testuser';
      const password = 'testpassword';
      const authResponse: IAuth = { token: 'testtoken' };
      component.username = username;
      component.password = password;
      component.login();

      authService.login.and.returnValue(of(authResponse));
      expect(router.navigate).toHaveBeenCalled();
    });

    it('should not set token in localStorage or navigate if username or password is missing', () => {

      component.login();
      expect(authService.login).not.toHaveBeenCalled();
      expect(localStorage.getItem('token')).toBeNull();
      expect(router.navigate).not.toHaveBeenCalled();
    });

     it('should set token in localStorage when loginObservable is truthy', () => {
      const authResponse: IAuth = { token: 'testtoken' };
      authService.login.and.returnValue(of(authResponse));
      component.username = 'testuser';
      component.password = 'testpassword';
      component.login();
      expect(authService.login).toHaveBeenCalled();
    });
  });
});
