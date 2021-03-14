import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TwoFactorAuthenticationService {
  private url: string = 'https://rsieh-dev.azure-api.net/interview/verify-2fa';

  constructor(private httpClient: HttpClient) { 
  }

  verifyCode(code: any) {    
    var data = JSON.stringify(code);
    return this.httpClient.post(this.url, data);
  }
}
