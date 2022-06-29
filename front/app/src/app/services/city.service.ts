import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  get_all() {
    return this.http.get(`${this.uri}/cities/getCities`);
  }

  get_city(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/cities/getCity`, data);
  }
}
