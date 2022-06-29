import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Real_estate } from '../models/real_estate';
import { User } from '../models/user';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer_home.component.html',
  styleUrls: ['./buyer_home.component.css']
})
export class BuyerHomeComponent implements OnInit {

  constructor(private real_estate_service: RealEstateService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.real_estate_service.get_all().subscribe((all_rs: Real_estate[]) => {
      this.all_real_estates = all_rs;
    })
  }

  calc_average_price(rs) {
    let cnt = 0;
    let sum = 0;
    for (let real_estate of this.all_real_estates) {
      if (rs.name == real_estate.name && rs.microlocation == real_estate.microlocation) {
        cnt++;
        sum += Math.trunc(real_estate.price / real_estate.area);
      }
    }
    return Math.trunc(sum / cnt);
  }

  

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  

  search_real_estates() {
    const data = {};
    if (this.name != null && this.name != '') data["name"] = this.name;
    else return;
    if (this.city != null && this.city != '') data["city"] = { $regex: this.city }; 
    if (this.municipality != null && this.municipality != '') data["municipality"] = { $regex: this.municipality };
    if (this.microlocation != null && this.microlocation != '') data["microlocation"] = { $regex: this.microlocation };
    if (this.price != null) data["price"] = { $lte: this.price };
    if (this.area != null) data["area"] = { $gte: this.area };
    if (this.rooms != null) data["rooms"] = { $gte: this.rooms };

    data["sold"] = 0;
    this.real_estate_service.search_real_estates(data).subscribe((ret: Real_estate[]) => {
      this.real_estates = ret;
    })
  }

  view_more(rs) {
    localStorage.setItem('real_estate', JSON.stringify(rs));
    this.router.navigate(['buyer/real_estate']);
  }

  advanced_search() {
    this.router.navigate(['buyer/advanced_search']);
  }

  change_password_window: boolean = false;
  old_password: string;
  new_password: string;
  confirm_password: string;
  
  message: string;
  user: User;

  real_estates: Array<Real_estate>;
  name: string;
  city: string;
  municipality: string;
  microlocation: string;
  price: number;
  area: number;
  rooms: number;

  all_real_estates: Real_estate[];
  average_prices
}
