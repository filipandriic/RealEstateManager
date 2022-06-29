import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.css']
})
export class BuyerInfoComponent implements OnInit {

  constructor(private router: Router, private user_service: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.formatted_date = this.format_date(this.user);
  }

  format_date(user: User) {
    const date = new Date(user.birthday)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.'
  }
  
  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  change_password() {
    if (this.user.password == this.old_password) {
      if (this.new_password == this.confirm_password) {
        this.user_service.change_password(this.user.username, this.new_password).subscribe(res => {
          alert(res['message']);
          this.logout();
        })
      } else {
        this.message = "Passwords don't match."
      }
    } else {
      this.message = 'Wrong password.'
    }
  }

  change_password_window: boolean = false;
  old_password: string;
  new_password: string;
  confirm_password: string;
  
  message: string;

  user: User;
  
  formatted_date: string;
}
