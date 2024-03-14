import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { UpdateDeliveryAddressDtoForManagement } from '../models/update-delivery-address-dto-for-management';
import { AddDeliveryAddressToExistCustomerForManagementDto } from '../models/add-delivery-address-to-exist-customer-for-management-dto';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryAddressService {
  baseApiUrl = environment.apiUrl + 'DeliveryAddresses/';
  constructor(private httpClient: HttpClient) {}

  deleteDeliveryAddressFromManagement(
    deliveryAddressId: number,
    deletedById: number
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}deleteDeliveryAddressFromManagement?deliveryAddressId=${deliveryAddressId}&deletedById=${deletedById}`,
      null
    );
  }
  updateDeliveryAddressForManagement(
    updateRequest: UpdateDeliveryAddressDtoForManagement
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      `${this.baseApiUrl}updateDeliveryAddressForManagement`,
      updateRequest
    );
  }
  addDeliveryAddressToExistCustomerForManagement(
    addAddressRequest: AddDeliveryAddressToExistCustomerForManagementDto
  ) {
    return this.httpClient.post<ResponseModel>(
      `${this.baseApiUrl}addDeliveryAddressToExistCustomerForManagement`,
      addAddressRequest
    );
  }
}
