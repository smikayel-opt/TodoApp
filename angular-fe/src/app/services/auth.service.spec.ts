import { of } from "rxjs";
import { AuthService, IAuth, IUser } from "./auth.service";
import { HttpClient } from "@angular/common/http";

describe('AuthService', () => {
  let authService: AuthService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(httpSpy);
    httpClient = httpSpy;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to the correct endpoint and return an Observable<IAuth>', () => {
      const user: IUser = { username: 'testuser', password: 'testpassword' };
      const expectedResponse: IAuth = { token: 'testtoken' };
      httpClient.post.and.returnValue(of(expectedResponse));

      authService.login(user).subscribe((result: IAuth) => {
        expect(result).toEqual(expectedResponse);
        expect(httpClient.post).toHaveBeenCalledWith(`${authService.API_URL}login`, user);
      });
    });
  });

  describe('getTokenFromLocalStorage', () => {
    it('should retrieve the token from local storage', () => {
      const testToken = 'testtoken';
      spyOn(localStorage, 'getItem').and.returnValue(testToken);

      const result = authService.getTokenFromLocalStorage();

      expect(result).toEqual(testToken);
      expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if a token is found in local storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('testtoken');

      const result = authService.isLoggedIn();

      expect(result).toBe(true);
    });

    it('should return false if no token is found in local storage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = authService.isLoggedIn();

      expect(result).toBe(false);
    });
  });
});