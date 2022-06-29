import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Real_estate } from '../models/real_estate';
import { User } from '../models/user';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private user_service: UserService, private router: Router, private real_estate_service: RealEstateService) { }

  ngOnInit(): void {
    this.real_estate_service.get_all().subscribe((res: Real_estate[]) => {
      for (let i = res.length - 5; i < res.length; i++) {
        this.real_estates.push(res[i]);
      }


      for (let i = res.length - 5; i < res.length; i++) {
        this.images.push(res[i].images[this.get_rand_pic(res[i].images.length - 1)]);
      }
    })
  }

  username: string;
  password: string;
  
  message: string;
  images: Array<string> = [];

  real_estates: Array<Real_estate> = [];

  set_message(message) {
    this.message = message;
  }

  login() {
    this.set_message(null);
    if (this.password == null || this.password == '') this.set_message('Password required');
    if (this.username == null || this.username == '') this.set_message('Username required.');

    if (this.message != null) return;

    this.user_service.login(this.username, this.password).subscribe((user: User) => {
      if (user) {
        localStorage.setItem('logged', JSON.stringify(user));
        if (user.status == "pending") {
          this.set_message('Pending');
          return;
        }
        if (user.type == "admin") {
          this.router.navigate(['/admin']);
        }
        else if (user.type == "buyer") {
          this.router.navigate(['/buyer']);
        }
        else {
          this.router.navigate(['/agent']);
        }
      }
      else this.set_message("User doesn't exist.");
    })
  }

  get_rand_pic(max) {
    return Math.floor(Math.random() * max);
  }

}
