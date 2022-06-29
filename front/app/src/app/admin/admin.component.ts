import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { CityService } from '../services/city.service';
import { MicrolocationService } from '../services/microlocation.service';
import { MunicipalityService } from '../services/municipality.service';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private user_service: UserService, private agency_service: AgencyService, private router: Router, private city_service: CityService,
    private municipality_service: MunicipalityService, private microlocation_service: MicrolocationService,
    private real_estate_service: RealEstateService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.city_service.get_all().subscribe((res: City[]) => {
      this.all_cities = res;
    })
    this.municipality_service.get_all().subscribe((res: Municipality[]) => {
      this.all_municipalities = res;
    })
    this.get_all_microlocations();
  }

  

  

  format_date(user: User) {
    const date = new Date(user.birthday)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.'
  }

  set_message(message) {
    this.message = message;
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  add_agency() {
    this.set_message(null);

    if (this.PIB == null || this.PIB == '') this.set_message("PIB required.");
    if (this.contact == null || this.contact == '') this.set_message("Contact required.");
    if (this.city == null || this.city == '') this.set_message("City required.");
    if (this.address == null || this.address == '') this.set_message("Address required.");
    if (this.name == null || this.name == '') this.set_message("Name required.");

    if (this.message != null) return;

    this.agency_service.add_agency(this.name, this.address, this.city, this.contact, this.PIB).subscribe(res => {
      alert(res['message']);
    })
  }

  add_microlocation() {
    this.micro_message = null;

    if (this.micro_name == null || this.micro_name == '') this.micro_message =  "Name required.";
    if (this.muni_name == null || this.muni_name == '') this.micro_message =  "Municipality required.";

    if (this.micro_message != null) return;

    this.microlocation_service.add_microlocation(this.micro_name).subscribe(res => {
      alert(res["message"])
      this.get_all_microlocations();
    })
    this.municipality_service.push_microlocaiton(this.muni_name, this.micro_name).subscribe(res => {
      alert(res["message"])
    })
  }

  add_street() {
    this.street_message = null;

    if (this.street == null || this.street == '') this.street_message =  "Name required.";
    if (this.microlocation == null || this.microlocation == '') this.street_message =  "Microlocation required.";

    if (this.street_message != null) return;

    this.microlocation_service.push_street(this.microlocation, this.street).subscribe(res => {
      alert(res["message"])
    })
  }

  get_all_microlocations() {
    this.microlocation_service.get_all().subscribe((res: Microlocation[]) => {
      this.all_microlocations = res;
    })
  }

  remove_microlocation() {
    this.remove_micro_message = null;

    if (this.remove_micro_name == null || this.remove_micro_name == '') this.remove_micro_message = "Name required.";

    if (this.remove_micro_message != null) return;

    this.real_estate_service.get_num_microlocation(this.remove_micro_name).subscribe(res => {
      if (res["number"] == 0) {
        this.microlocation_service.remove_microlocation(this.remove_micro_name).subscribe(res => {
          alert(res["message"])
          this.get_all_microlocations();
        })
        this.municipality_service.pull_microlocaiton(this.remove_micro_name).subscribe(res => {
          alert(res["message"])
        })
      } else {
        alert("Microlocation has real estates.");
      }
    })

    
  }

  user: User;
  name: string;
  address: string;
  city: string;
  contact: string;
  PIB: string;

  message: string;
  all_cities: Array<City>;
  all_municipalities: Array<Municipality>;
  all_microlocations: Array<Microlocation>;

  micro_name: string;
  muni_name: string;
  micro_message: string;
  street_message: string;

  microlocation: string;
  street: string;
  remove_micro_message: string;
  remove_micro_name: string;
}
