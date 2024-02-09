import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIUploadResp } from './types/images';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  API_URL = 'http://localhost:5000/api/images/'

  constructor(
    public http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * will create the headers for auth headers
   * @returns new Headers() : the header object of the headers (basically for auth headers)
   */
  private getHeadersWithAuthorization(): HttpHeaders {
    const token = this.authService.getTokenFromLocalStorage();
    return new HttpHeaders().set('Authorization', `${token}`);
  }

  /**
   * upload image endpoint to be able to handle uploading of the image
   * @param imageFormData: form data for the image which should be uploaded
   * @returns the post request observer
   */
  uploadImage(imageFormData: FormData) {
    const headers = this.getHeadersWithAuthorization();
    return this.http.post<IIUploadResp>(this.API_URL, imageFormData, { headers })
  }
}
