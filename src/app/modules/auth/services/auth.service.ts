import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginModel } from '../models/user-login-model';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { UserRegisterModel } from '../models/user-register-model';
import { CheckUserAuthenticationModel } from '../models/check-user-authentication-model';
import { SingleResponseModel } from 'src/app/generic-models/single-response-model';
import { AccessToken } from '../models/access-token';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> =
    this.isLoggedInSubject.asObservable();
  checkUserAuthenticationModel: CheckUserAuthenticationModel = {
    refreshToken: '',
    token: '',
  };

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService
  ) {}

  login(
    userLoginModel: UserLoginModel
  ): Observable<SingleResponseModel<AccessToken>> {
    const LOGIN_API_URL = environment.apiUrl + 'Auths/loginAsCargoCompanyUser';
    let result = this.httpClient.post<SingleResponseModel<AccessToken>>(
      LOGIN_API_URL,
      userLoginModel,
      { withCredentials: true }
    );
    result.subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoggedInSubject.next(true);
        }
      },
    });
    return result;
  }

  register(userRegisterModel: UserRegisterModel): Observable<ResponseModel> {
    const REGISTER_API_URL = environment.apiUrl + 'Auths/register';
    return this.httpClient.post<ResponseModel>(
      REGISTER_API_URL,
      userRegisterModel
    );
  }

  checkUserAuthentication(
    checkUserAuthenticationModel: CheckUserAuthenticationModel
  ): Observable<ResponseModel> {
    const CHECK_USER_AUTHENTICATION_API_URL =
      environment.apiUrl + 'Auths/checkUserAuthentication';
    return this.httpClient.post<ResponseModel>(
      CHECK_USER_AUTHENTICATION_API_URL,
      checkUserAuthenticationModel,
      { withCredentials: true }
    );
  }

  checkLoginStatus() {
    let refreshToken = this.cookieService.get('refreshToken');
    let token = localStorage.getItem('token');
    this.checkUserAuthenticationModel = {
      refreshToken: refreshToken,
      token: token!,
    };
    const isLogged = false;
    this.checkUserAuthentication(this.checkUserAuthenticationModel).subscribe({
      next: (response) => {
        if (response.success) {
          response.success = isLogged;
          this.isLoggedInSubject.next(isLogged);
        }
      },
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logOut(): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      environment.apiUrl + 'Auths/logout',
      {},
      { withCredentials: true }
    );
  }
}
