import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllSellerResponseDto } from '../models/get-all-seller-response-dto';
import { CreateSellerRequestDto } from '../models/create-seller-request-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { environment } from 'src/app/enviroments/enviroment';

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
  getActiveSellers(): Observable<ListResponseModel<GetAllSellerResponseDto>> {
    return this.httpClient.get<ListResponseModel<GetAllSellerResponseDto>>(
      this.baseApiUrl + 'getActiveSellers'
    );
  }
  createSeller(
    createSellerRequestDto: CreateSellerRequestDto
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseApiUrl}createSeller`,
      createSellerRequestDto
    );
  }
  activateSellerBySellerId(sellerId: number): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}activateSellerBySellerId?sellerId=${sellerId}`,
      null
    );
  }
  inactivateSellerBySellerId(
    sellerId: number,
    deletedById: number
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}inactivateSellerBySellerId?sellerId=${sellerId}&deletedById=${deletedById}`,
      null
    );
  }
}
