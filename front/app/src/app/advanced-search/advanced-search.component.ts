import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
import { Real_estate } from '../models/real_estate';
import { User } from '../models/user';
import { CharacteristicsService } from '../services/characteristics.service';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private router: Router, private characteristics_service: CharacteristicsService, private real_estate_service: RealEstateService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.characteristics_service.get_all_characteristics().subscribe((res: Characteristic[]) => {
      this.all_characteristics = res;
      this.real_estate_service.get_all().subscribe((all_rs: Real_estate[]) => {
        this.all_real_estates = all_rs;
        this.search();
      })
    });
    
    
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

  has_characteristic(characteristic) {
    return this.characteristics.includes(characteristic)
  }

  view_more(rs) {
    localStorage.setItem('real_estate', JSON.stringify(rs));
    this.router.navigate(['buyer/real_estate']);
  }

  add_characteristic(characteristic) {
    if (this.characteristics.includes(characteristic))
      this.characteristics.splice(this.characteristics.indexOf(characteristic), 1);
    else
      this.characteristics.push(characteristic);

    this.search();
  }

  add_heating(heat) {
    if (this.heatings.includes(heat))
      this.heatings.splice(this.heatings.indexOf(heat), 1);
    else
      this.heatings.push(heat);

    this.search();
  }

  add_state(st) {
    if (this.states.includes(st))
      this.states.splice(this.states.indexOf(st), 1);
    else
      this.states.push(st);

    this.search();
  }

  add_advertiser(advert) {
    if (this.advertisers.includes(advert))
      this.advertisers.splice(this.advertisers.indexOf(advert), 1);
    else
      this.advertisers.push(advert);

    this.search();
  }

  has_advertiser(a) {
    return this.advertisers.includes(a);
  }

  has_state(a) {
    return this.states.includes(a);
  }

  has_heating(heat) {
    return this.heatings.includes(heat);
  }

  search() {
    const data = {};

    if (this.price_from != null || this.price_to != null)
      data["price"] = { $gte :  this.price_from == null ? 0 : this.price_from, $lte : this.price_to == null ? Number.MAX_VALUE : this.price_to };

    if (this.area_from != null || this.area_to != null)
      data["area"] = { $gte :  this.area_from == null ? 0 : this.area_from, $lte : this.area_to == null ? Number.MAX_VALUE : this.area_to };

    if (this.rooms_from != null || this.rooms_to != null)
      data["rooms"] = { $gte :  this.rooms_from == null ? 0 : this.rooms_from, $lte : this.rooms_to == null ? Number.MAX_VALUE : this.rooms_to };

    if (this.construction_year_from != null || this.construction_year_to != null)
      data["construction_year"] = { $gte :  this.construction_year_from == null ? 0 : this.construction_year_from, $lte : this.construction_year_to == null ? Number.MAX_VALUE : this.construction_year_to };

    if (this.floor_from != null || this.floor_to != null)
      data["floor"] = { $gte :  this.floor_from == null ? 0 : this.floor_from, $lte : this.floor_to == null ? Number.MAX_VALUE : this.floor_to };

    if (this.monthly_utilities_from != null || this.monthly_utilities_to != null)
      data["monthly_utilities"] = { $gte :  this.monthly_utilities_from == null ? 0 : this.monthly_utilities_from, $lte : this.monthly_utilities_to == null ? Number.MAX_VALUE : this.monthly_utilities_to };

    if (this.characteristics.length > 0)
      data["characteristics"] = { $all: this.characteristics };

    if (this.advertisers.length == 1 && this.advertisers.includes('agency'))
      data["agency"] = { $exists: true };
    else if (this.advertisers.length == 1 && this.advertisers.includes('owner'))
      data["agency"] = { $exists: false };

    if (this.states.length > 0)
      data["state"] = { $in: this.states };

    if (this.heatings.length > 0)
      data["heating"] = { $in: this.heatings };
    
    data["sold"] = 0;
    this.real_estate_service.search_real_estates(data).subscribe((ret: Real_estate[]) => {
      this.real_estates = ret;
    })
  }

  user: User;
  real_estates: Array<Real_estate>;
  all_characteristics: Array<Characteristic>;

  advertisers: Array<string> = [];
  states: Array<string> = [];
  heatings: Array<string> = [];
  characteristics: Array<string> = [];
  price_from: number;
  price_to: number;
  area_from: number;
  area_to: number;
  rooms_from: number;
  rooms_to: number;
  construction_year_from: number;
  construction_year_to: number;
  floor_from: number;
  floor_to: number;
  monthly_utilities_from: number;
  monthly_utilities_to: number;

  all_real_estates: Real_estate[];
}
