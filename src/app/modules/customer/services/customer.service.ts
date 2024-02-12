import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllCustomersForManagementResponseDto } from '../models/response/get-all-customers-for-management-response-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseApiUrl = environment.apiUrl + 'Customers/';
  constructor(private httpClient: HttpClient) {}

  getAllCustomersForManagement(): Observable<
    ListResponseModel<GetAllCustomersForManagementResponseDto>
  > {
    return this.httpClient.get<
      ListResponseModel<GetAllCustomersForManagementResponseDto>
    >(this.baseApiUrl + 'getAllCustomersForManagement');
  }
}
