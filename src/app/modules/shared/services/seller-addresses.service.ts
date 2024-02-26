import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllSellerAddressesResponseDto } from '../models/get-all-seller-addresses-response-dto';

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
}
