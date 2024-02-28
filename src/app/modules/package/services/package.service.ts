import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { GetAllPackagesForManagementResponseDto } from '../models/get-all-packages-for-management-response-dto';
import { GetPackageDetailsForManagementResponseDto } from '../models/get-package-details-for-management-response-dto';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  baseApiUrl = environment.apiUrl + 'Packages/';
  constructor(private httpClient: HttpClient) {}

  getAllPackagesForManagement(): Observable<
    ListResponseModel<GetAllPackagesForManagementResponseDto>
  > {
    return this.httpClient.get<
      ListResponseModel<GetAllPackagesForManagementResponseDto>
    >(this.baseApiUrl + 'getAllPackagesForManagement');
  }
  getPackageDetailsForManagementByPackageId(
    packageId: number
  ): Observable<GetPackageDetailsForManagementResponseDto> {
    const url = `${this.baseApiUrl}getPackageDetailsForManagementByPackageId?packageId=${packageId}`;
    return this.httpClient.get<GetPackageDetailsForManagementResponseDto>(url);
  }
}
