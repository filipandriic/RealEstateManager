import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { Characteristic } from '../models/characteristic';
import { Favourite } from '../models/favourite';
import { Real_estate } from '../models/real_estate';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { CharacteristicsService } from '../services/characteristics.service';
import { FavouritesService } from '../services/favourites.service';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.css']
})
export class RealEstateComponent implements OnInit {

  constructor(private characteristics_service: CharacteristicsService, private favourites_service: FavouritesService,
    private router: Router, private real_estate_service: RealEstateService, private user_service: UserService,
    private agency_service: AgencyService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.real_estate = JSON.parse(localStorage.getItem('real_estate'));
    this.characteristics_service.get_all_characteristics().subscribe((res: Characteristic[]) => {
      this.all_characteristics = res;
      this.real_estate_service.get_all().subscribe((all_rs: Real_estate[]) => {
        this.all_real_estates = all_rs;
      })
    });
    this.favourites_service.is_favourite(this.user.username, this.real_estate).subscribe((res: Favourite) => {
      if (res) this.in_favourites = true;
    })
    this.user_service.get_by_username(this.real_estate.advertiser).subscribe((res: User) => {
      this.advertiser = res;

      if (this.advertiser.agency) {
        this.agency_service.get_one(this.advertiser.agency).subscribe((agency_: Agency) => {
          this.agency = agency_;
        })
      }
    })
  }

  calc_average_price() {
    let cnt = 0;
    let sum = 0;
    for (let rs of this.all_real_estates) {
      if (this.real_estate.name == rs.name && rs.microlocation == this.real_estate.microlocation) {
        cnt++;
        sum += Math.trunc(rs.price / rs.area);
      }
    }
    return Math.trunc(sum / cnt);
  }

  has_characteristic(characteristic) {
    return this.real_estate.characteristics.includes(characteristic);
  }

  add_to_favourites() {
    this.favourites_service.get_my_favourites(this.user.username).subscribe((my_favs: Favourite[]) => {

      if (my_favs.length > 4) {
        alert("Maximum number of favourite real estates reached.");
      } else {
        this.favourites_service.add_favourite(this.user.username, this.real_estate).subscribe(res => {
          alert(res['message']);
          this.favourites_service.is_favourite(this.user.username, this.real_estate).subscribe((res: Favourite) => {
            if (res) this.in_favourites = true;
          })
        })
      }
    })

  }

  is_cheaper() {
    return (Math.trunc(this.real_estate.price / this.real_estate.area) < this.calc_average_price())
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  show_contact() {
    this.is_show_contact = !this.is_show_contact;
  }

  user: User;
  real_estate: Real_estate;
  all_characteristics: Array<Characteristic>;
  in_favourites: boolean = false;

  advertiser: User;

  agency: Agency = null;

  is_show_contact: boolean = false;
  
  all_real_estates: Real_estate[];
}
