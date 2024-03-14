import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { SingleResponseModel } from 'src/app/generic-models/single-response-model';
import { District } from '../models/district';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  apiUrl = environment.apiUrl + 'Districts/';

  constructor(private httpClient: HttpClient) {}

  getAllDistrictsByCityNameId(
    id: number
  ): Observable<ListResponseModel<District>> {
    const urlWithParam = `${
      this.apiUrl + 'getAllDistrictsByCityNameId'
    }?id=${id}`;

    return this.httpClient.get<ListResponseModel<District>>(urlWithParam);
  }
  getAllDistrictsByCityKey(
    cityKey: number
  ): Observable<ListResponseModel<District>> {
    const url = `${this.apiUrl}getAllDistrictsByCityKey?cityKey=${cityKey}`;
    return this.httpClient.get<ListResponseModel<District>>(url);
  }

  getDistrictById(id: number): Observable<SingleResponseModel<District>> {
    return this.httpClient.get<SingleResponseModel<District>>(
      this.apiUrl + `getDistrictById?id=${id}`
    );
  }
}
