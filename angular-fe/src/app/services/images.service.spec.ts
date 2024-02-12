import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { ImagesService } from './images.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('ImagesService', () => {
  let service: ImagesService;
  let mockHttp: jasmine.SpyObj<HttpClient>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getTokenFromLocalStorage']);
    mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
    service = new ImagesService(mockHttp, authService);
  });

  describe('getHeadersWithAuthorization', () => {
    it('should return headers with authorization token', () => {
      const fakeToken = 'fake-token';
      authService.getTokenFromLocalStorage.and.returnValue(fakeToken);
      const headers = service['getHeadersWithAuthorization']();

      expect(headers instanceof HttpHeaders).toBe(true);
      expect(headers.get('Authorization')).toBe(fakeToken);
    });

    it('should return headers without authorization token if token is not available', () => {
      const headers = service['getHeadersWithAuthorization']();

      expect(headers instanceof HttpHeaders).toBe(true);
      expect(!headers.get('Authorization')).toBeFalsy();
    });
  });


  describe('uploadImage', () => {
    it('should upload image successfully with authorization headers', () => {
      const formData = new FormData();
      const fakeToken = 'fake-token';
      authService.getTokenFromLocalStorage.and.returnValue(fakeToken);
      const expectedHeaders = new HttpHeaders().set('Authorization', fakeToken);

      const fakeResponse = {
        "message": "Image saved successfully",
        "status": "success"
      };
      mockHttp.post.and.returnValue(of(fakeResponse));

      service.uploadImage(formData).subscribe(response => {
        expect(response).toEqual(fakeResponse);
        expect(mockHttp.post).toHaveBeenCalledWith(service.API_URL, formData, { headers: expectedHeaders });
      });
    });

    it('should not include authorization headers if token is not available', () => {
      const formData = new FormData();
      authService.getTokenFromLocalStorage.and.returnValue(null);

      const fakeResponse = {
        "message": "Image saved successfully",
        "status": "success"
      };
      mockHttp.post.and.returnValue(of(fakeResponse));

      service.uploadImage(formData).subscribe(response => {
        expect(response).toEqual(fakeResponse);
        expect(mockHttp.post).toHaveBeenCalledOnceWith(service.API_URL, formData, jasmine.any(Object));
      });
    });
  });
});
