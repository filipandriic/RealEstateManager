import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { RealEstateService } from '../services/real-estate.service';
import { Real_estate } from '../models/real_estate';
import { Characteristic } from '../models/characteristic';
import { CharacteristicsService } from '../services/characteristics.service';
import { City } from '../models/city';
import { CityService } from '../services/city.service';
import { MunicipalityService } from '../services/municipality.service';
import { MicrolocationService } from '../services/microlocation.service';
import { Municipality } from '../models/municipality';
import { Microlocation } from '../models/microlocation';

@Component({
  selector: 'app-agent_my_real_estates',
  templateUrl: './agent_my_real_estates.component.html',
  styleUrls: ['./agent_my_real_estates.component.css']
})
export class AgentMyRealEstatesComponent implements OnInit {

  constructor(private user_service: UserService, private real_estate_service: RealEstateService,
    private characteristics_service: CharacteristicsService, private router: Router,
    private city_service: CityService, private municipality_service: MunicipalityService,
    private microlocation_sevice: MicrolocationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.get_my_real_estates();
    this.characteristics_service.get_all_characteristics().subscribe((res: Characteristic[]) => {
      this.all_characteristics = res;
    });
  }

  get_my_real_estates() {
    this.real_estate_service.get_by_advertiser(this.user.username).subscribe((res: Real_estate[]) => {
      this.my_real_estates = res;
    });
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  set_message(message) {
    this.message = message;
  }

  enable_edit() {
    this.edit_enabled = !this.edit_enabled;
    if (!this.edit_enabled)
      this.get_my_real_estates();
  }

  can_update(rs) {
    if (new Date(rs.last_updated).getTime() + 60*60*1000 > new Date().getTime()) return (new Date(new Date(rs.last_updated).getTime() + 60*60*1000 - new Date().getTime()).getMinutes().toString() + " minutes")
    return "Update";
  }

  update_real_estate(rs) {
    rs.last_updated = new Date();
    this.real_estate_service.update(rs).subscribe(res => {
      alert(res['message']);
      this.get_my_real_estates();
    });
  }

  sell(rs) {
    rs.sold = new Date().getMonth() + 1;
    this.real_estate_service.sell(rs).subscribe(res => {
      alert(res['message']);
      this.get_my_real_estates();
    });
  }

  get_municipalities(city, rs) {
    this.all_municipalities = [];
    rs.municipality = null;
    this.all_microlocations = [];
    rs.microlocation = null;
    this.all_streets = [];
    rs.street = null;
    this.city_service.get_city(city).subscribe((res: City) => {
      this.all_municipalities = res.municipalities;
    })
  }

  get_microlocations(municipality, rs) {
    this.all_microlocations = [];
    rs.microlocation = null;
    this.all_streets = [];
    rs.street = null;
    this.municipality_service.get_municipality(municipality).subscribe((res: Municipality) => {
      this.all_microlocations = res.microlocations;
    })
  }

  get_streets(microlocation, rs) {
    this.all_streets = [];
    rs.street = null;
    this.microlocation_sevice.get_microlocation(microlocation).subscribe((res: Microlocation) => {
      this.all_streets = res.streets;
    })
  }

  add_characteristic(characteristic, rs) {
    // alert(rs.name)
    if (rs.characteristics.includes(characteristic))
      rs.characteristics.splice(rs.characteristics.indexOf(characteristic), 1);
    else
      rs.characteristics.push(characteristic);
  }

  has_characteristic(characteristic, rs) {
    return rs.characteristics.includes(characteristic);
  }
  message: string;
  user: User;
  my_real_estates: Array<Real_estate>;

  all_characteristics: Array<Characteristic>;

  edit_enabled: boolean = false;
  all_cities: Array<City>;
  all_municipalities: Array<string> = [];
  all_microlocations: Array<string> = [];
  all_streets: Array<string> = [];
}
