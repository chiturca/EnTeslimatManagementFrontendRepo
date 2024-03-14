import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetSellerEmployeeForManagementResponseDto } from '../models/get-seller-employee-for-management-response-dto';
import { CreateSellerEmployeeDto } from '../models/create-seller-employee-dto';
import { ResponseModel } from 'src/app/generic-models/response-model';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SellerEmployeesService {
  baseApiUrl = environment.apiUrl + 'SellerEmployees/';
  constructor(private httpClient: HttpClient) {}

  getAllSellerEmployeesForManagement(): Observable<
    ListResponseModel<GetSellerEmployeeForManagementResponseDto>
  > {
    return this.httpClient.get<
      ListResponseModel<GetSellerEmployeeForManagementResponseDto>
    >(this.baseApiUrl + 'getAllSellerEmployeesForManagement');
  }
  createSellerEmployee(
    createSellerEmployeeDto: CreateSellerEmployeeDto
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      `${this.baseApiUrl}createSellerEmployee`,
      createSellerEmployeeDto
    );
  }
}
