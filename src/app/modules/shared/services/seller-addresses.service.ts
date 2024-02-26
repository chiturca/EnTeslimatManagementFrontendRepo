import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllSellerAddressesResponseDto } from '../models/get-all-seller-addresses-response-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { AddSellerAddressToSellerRequestDto } from '../models/add-seller-address-to-seller-request-dto';
import { UpdateSellerAddressRequestDto } from '../models/update-seller-address-request-dto';

@Injectable({
  providedIn: 'root',
})
export class SellerAddressesService {
  baseApiUrl = environment.apiUrl + 'SellerAddresses/';
  constructor(private httpClient: HttpClient) {}

  getAllSellerAddressesBySellerId(
    sellerId: number
  ): Observable<ListResponseModel<GetAllSellerAddressesResponseDto>> {
    return this.httpClient.get<
      ListResponseModel<GetAllSellerAddressesResponseDto>
    >(this.baseApiUrl + `getAllSellerAddressesBySellerId?sellerId=${sellerId}`);
  }
  activateSellerAddressById(id: number): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}activateSellerAddressById?id=${id}`,
      null
    );
  }
  deactivateSellerAddressById(id: number): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}deactivateSellerAddressById?id=${id}`,
      null
    );
  }
  addSellerAddressToSeller(
    addAddressRequest: AddSellerAddressToSellerRequestDto
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseApiUrl}addSellerAddressToSeller`,
      addAddressRequest
    );
  }
  updateSellerAddressById(
    updateRequest: UpdateSellerAddressRequestDto,
    id: number
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}updateSellerAddressById?id=${id}`,
      updateRequest
    );
  }
}
