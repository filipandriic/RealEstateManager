import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  add_agency(name, address, city, contact, PIB) {
    const data = {
      name: name,
      address: address,
      city: city,
      contact: contact,
      PIB: PIB
    }

    return this.http.post(`${this.uri}/agencies/addAgency`, data);
  }

  get_all() {
    return this.http.get(`${this.uri}/agencies/getAgencies`);
  }

  get_one(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/agencies/getAgency`, data);
  }
}
