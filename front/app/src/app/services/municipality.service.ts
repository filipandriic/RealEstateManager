import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  get_all() {
    return this.http.get(`${this.uri}/municipalities/getMunicipalities`);
  }

  push_microlocaiton(municipality, microlocation) {
    const data = {
      name: municipality,
      microlocation: microlocation
    }

    return this.http.post(`${this.uri}/municipalities/pushMicrolocation`, data);
  }

  pull_microlocaiton(microlocation) {
    const data = {
      microlocation: microlocation
    }

    return this.http.post(`${this.uri}/municipalities/pullMicrolocation`, data);
  }

  get_municipality(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/municipalities/getMunicipality`, data);
  }
}
