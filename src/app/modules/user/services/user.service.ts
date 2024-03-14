import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/generic-models/single-response-model';
import { GetUserByRefreshTokenResponseDtoModel } from '../models/response/get-user-by-refresh-token-response-dto-model';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl = environment.apiUrl + 'Users/';
  constructor(private httpClient: HttpClient) {}
  getUserFromAuth(
    refreshToken: string
  ): Observable<SingleResponseModel<GetUserByRefreshTokenResponseDtoModel>> {
    const params = new HttpParams().set('refreshToken', refreshToken);
    return this.httpClient.get<
      SingleResponseModel<GetUserByRefreshTokenResponseDtoModel>
    >(this.baseApiUrl + 'getUserFromAuth', { params });
  }
  getUserFromAuthByDto(): Observable<
    SingleResponseModel<GetUserByRefreshTokenResponseDtoModel>
  > {
    return this.httpClient.get<
      SingleResponseModel<GetUserByRefreshTokenResponseDtoModel>
    >(this.baseApiUrl + 'getUserFromAuthByDto', { withCredentials: true });
  }
}
