import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllSellerResponseDto } from '../models/get-all-seller-response-dto';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  baseApiUrl = environment.apiUrl + 'Sellers/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<GetAllSellerResponseDto>> {
    return this.httpClient.get<ListResponseModel<GetAllSellerResponseDto>>(
      this.baseApiUrl + 'getAll'
    );
  }
}
