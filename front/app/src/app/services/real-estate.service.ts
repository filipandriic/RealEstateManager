import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  add_real_estate(data) {
    return this.http.post(`${this.uri}/real_estates/addRealEstate`, data);
  }

  get_all() {
    return this.http.get(`${this.uri}/real_estates/getAll`);
  }

  get_by_advertiser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/real_estates/getByAdvertiser`, data);
  }

  update(data) {
    return this.http.post(`${this.uri}/real_estates/updateRealEstate`, data);
  }

  sell(data) {
    return this.http.post(`${this.uri}/real_estates/sellRealEstate`, data);
  }

  get_num_advertiser(data) {
    return this.http.post(`${this.uri}/real_estates/getNumRealEstatesAdvertiser`, data);
  }

  get_num_agency(data) {
    return this.http.post(`${this.uri}/real_estates/getNumRealEstatesAgency`, data);
  }

  search_real_estates(data) {
    return this.http.post(`${this.uri}/real_estates/searchRealEstates`, data);
  }

  get_num_microlocation(microlocation) {
    const data = {
      microlocation: microlocation
    }

    return this.http.post(`${this.uri}/real_estates/getNumRealEstatesMicrolocation`, data);
  }
}
