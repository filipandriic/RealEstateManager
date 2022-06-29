import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(username, password, first_name, last_name, city, birthday, phone, email, type, agency, license, image, pending) {
    const data = {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      city: city,
      birthday: birthday,
      phone: phone,
      email: email,
      type: type,
      agency: agency,
      license: license,
      image: image,
      status: pending
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  get_all() {
    return this.http.get(`${this.uri}/users/getUsers`);
  }

  get_pending_users() {
    return this.http.get(`${this.uri}/users/getPendingUsers`);
  }

  accept_user(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/acceptUser`, data);
  }

  reject_user(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/rejectUser`, data);
  }

  change_password(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  update_user_info(username, phone, email, agency) {
    const data = {
      username: username,
      phone: phone,
      email: email,
      agency: agency
    }

    return this.http.post(`${this.uri}/users/updateUserInfo`, data);
  }

  edit_user(username, password, first_name, last_name, city, birthday, phone, email, type, agency, license, image, pending) {
    const data = {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      city: city,
      birthday: birthday,
      phone: phone,
      email: email,
      type: type,
      agency: agency,
      license: license,
      image: image,
      status: pending
    }

    return this.http.post(`${this.uri}/users/editUser`, data);
  }

  get_by_username(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/getByUsername`, data);
  }
}
