import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  get_my_favourites(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/favourites/getMyFavourites`, data);
  }

  add_favourite(username, real_estate) {
    const data = {
      username: username,
      real_estate: real_estate
    }

    return this.http.post(`${this.uri}/favourites/addFavourite`, data);
  }

  is_favourite(username, real_estate) {
    const data = {
      username: username,
      real_estate: real_estate
    }

    return this.http.post(`${this.uri}/favourites/isFavourite`, data);
  }

  remove(username, real_estate) {
    const data = {
      username: username,
      real_estate: real_estate
    }

    return this.http.post(`${this.uri}/favourites/removeFavourite`, data);
  }
}
