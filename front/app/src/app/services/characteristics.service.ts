import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicsService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  get_all_characteristics() {
    return this.http.get(`${this.uri}/characteristics/getAllCharacteristics`);
  }
}
