import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrolocationService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  get_all() {
    return this.http.get(`${this.uri}/microlocations/getMicrolocations`);
  }
  
  add_microlocation(name) {
    const data = {
      name: name,
      streets: []
    }

    return this.http.post(`${this.uri}/microlocations/addMicrolocation`, data);
  }

  push_street(microlocation, street) {
    const data = {
      name: microlocation,
      street: street
    }

    return this.http.post(`${this.uri}/microlocations/pushStreet`, data);
  }

  remove_microlocation(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/microlocations/removeMicrolocation`, data);
  }

  get_microlocation(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/microlocations/getMicrolocation`, data);
  }
}
