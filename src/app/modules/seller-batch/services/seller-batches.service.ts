import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllSellerBatchesForManagementResponseDto } from '../models/get-all-seller-batches-for-management-response-dto';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SellerBatchesService {
  baseApiUrl = environment.apiUrl + 'SellerBatches/';
  constructor(private httpClient: HttpClient) {}

  getAllSellerBatchesForManagement(): Observable<
    ListResponseModel<GetAllSellerBatchesForManagementResponseDto>
  > {
    return this.httpClient.get<
      ListResponseModel<GetAllSellerBatchesForManagementResponseDto>
    >(this.baseApiUrl + 'getAllSellerBatchesForManagement');
  }
}
