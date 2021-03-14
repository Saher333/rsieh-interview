import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/models/authResponse.model';
import { TwoFactorAuthenticationService } from 'src/app/services/two-factor-authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  apiResponse: AuthResponse;
  public authenticationForm: FormGroup;

  constructor(private fb: FormBuilder, private twoFactorAuthenticationService :TwoFactorAuthenticationService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.apiResponse = new AuthResponse(false, []);

    this.initForm();
  }

  private initForm() {
    this.authenticationForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  public async verifyCode() {
    if(this.authenticationForm.valid){

      this.twoFactorAuthenticationService.verifyCode({code: this.authenticationForm.controls.code.value})
      .subscribe(
        (response: AuthResponse) => {
          this.apiResponse = response;
        },
        (error: AuthResponse) => {
          switch (error['status']) {
            case 400:
              this.apiResponse = error["error"];
              break;
            case 401:
            case 403:
              this.apiResponse = new AuthResponse(false, [error['error'].message])
              break;
            default:
              this.apiResponse = new AuthResponse(false, ['Error occured!']);
              break;
          }
        }
      );
    }
  }
}
