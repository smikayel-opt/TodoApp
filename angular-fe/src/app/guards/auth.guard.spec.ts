import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    guard = new AuthGuard(authService, router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if user is logged in', () => {
      authService.isLoggedIn.and.returnValue(true);

      const result = guard.canActivate(null!, null!);

      expect(result).toBe(true);
    });

    it('should navigate to /login and return false if user is not logged in', () => {
      authService.isLoggedIn.and.returnValue(false);

      const result = guard.canActivate(null!, null!);

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(result).toBe(false);
    });
  });
});
