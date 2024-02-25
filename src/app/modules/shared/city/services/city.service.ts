import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { ListResponseModel } from 'src/app/generic-models/list-response-model';
import { SingleResponseModel } from 'src/app/generic-models/single-response-model';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  apiUrl = environment.apiUrl + 'Cities/';

  constructor(private httpClient: HttpClient) {}

  getAllCities(): Observable<ListResponseModel<City>> {
    return this.httpClient.get<ListResponseModel<City>>(
      this.apiUrl + 'getAllCities'
    );
  }

  getCityById(id: number): Observable<SingleResponseModel<City>> {
    return this.httpClient.get<SingleResponseModel<City>>(
      this.apiUrl + `getCityById?id=${id}`
    );
  }
}
