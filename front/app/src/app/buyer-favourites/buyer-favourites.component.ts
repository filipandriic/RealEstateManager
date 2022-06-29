import { Component, OnInit } from '@angular/core';
import { Favourite } from '../models/favourite';
import { Real_estate } from '../models/real_estate';
import { User } from '../models/user';
import { FavouritesService } from '../services/favourites.service';
import { Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
import { CharacteristicsService } from '../services/characteristics.service';

@Component({
  selector: 'app-buyer-favourites',
  templateUrl: './buyer-favourites.component.html',
  styleUrls: ['./buyer-favourites.component.css']
})
export class BuyerFavouritesComponent implements OnInit {

  constructor(private favourites_service: FavouritesService, private router: Router, private characteristics_service: CharacteristicsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.characteristics_service.get_all_characteristics().subscribe((res: Characteristic[]) => {
      this.all_characteristics = res;
      this.get_my_favourites();
    });
    
  }

  get_my_favourites() {
    this.my_favourites = [];
    this.favourites_service.get_my_favourites(this.user.username).subscribe((res: Favourite[]) => {
      for (let fav of res) {
        this.my_favourites.push(fav.real_estate);
      }
    })
  }

  remove(rs) {
    this.favourites_service.remove(this.user.username, rs).subscribe(res => {
      alert(res['message']);
      this.get_my_favourites();
    })
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }


  has_characteristic(characteristic, rs) {
    return rs.characteristics.includes(characteristic);
  }

  all_characteristics: Array<Characteristic>;
  my_favourites: Array<Real_estate> = [];
  user: User;
}
