import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/generic-models/single-response-model';
import { Neighbourhood } from '../models/neighbourhood';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class NeighbourhoodService {
  apiUrl = environment.apiUrl + 'Neighbourhoods/';

  constructor(private httpClient: HttpClient) {}

  getAllNeighbourhoodsByDistrictKey(
    districtKey: number
  ): Observable<SingleResponseModel<Neighbourhood[]>> {
    const url = `${this.apiUrl}getAllNeighbourhoodsByDistrictKey?districtKey=${districtKey}`;
    return this.httpClient.get<SingleResponseModel<Neighbourhood[]>>(url);
  }
  getNeighbourhoodById(
    neighbourhoodId: number
  ): Observable<SingleResponseModel<Neighbourhood>> {
    const url = `${this.apiUrl}getNeighbourhoodById?id=${neighbourhoodId}`;
    return this.httpClient.get<SingleResponseModel<Neighbourhood>>(url);
  }
}
