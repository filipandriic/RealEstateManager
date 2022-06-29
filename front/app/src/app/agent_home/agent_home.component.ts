import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { CharacteristicsService } from '../services/characteristics.service';
import { CityService } from '../services/city.service';
import { MicrolocationService } from '../services/microlocation.service';
import { MunicipalityService } from '../services/municipality.service';
import { RealEstateService } from '../services/real-estate.service';

@Component({
  selector: 'app-agent_home',
  templateUrl: './agent_home.component.html',
  styleUrls: ['./agent_home.component.css']
})
export class AgentHomeComponent implements OnInit {

  constructor(private real_estate_service: RealEstateService,
    private characteristics_service: CharacteristicsService, private router: Router,
    private city_service: CityService, private municipality_service: MunicipalityService,
    private microlocation_sevice: MicrolocationService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.characteristics_service.get_all_characteristics().subscribe((res: Characteristic[]) => {
      this.all_characteristics = res;
    });
    this.city_service.get_all().subscribe((res: City[]) => {
      this.all_cities = res;
    })
  }

  set_message(message) {
    this.message = message;
  }

  on_json_select(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const allowed_file_types = ['application/json'];
  
    if (allowed_file_types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.json_data = JSON.parse(reader.result as string);
        this.json_select = file.name;
      }
      reader.readAsText(file);
    } else {
      this.set_message("File extension not supported.");
      return;
    }
  }

  on_images_select(event: Event) {
    const images = (event.target as HTMLInputElement).files;
    const allowed_file_types = ['image/png', 'image/jpg', 'image/jpeg'];

    if (images.length < 3 || images.length > 6) {
      this.set_message("Please upload 3 to 6 images.");
      return;
    }

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (allowed_file_types.includes(image.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result as string);
          this.image_select = "Selected";
        };
        reader.readAsDataURL(image);
      } else {
        this.images = [];
        this.set_message("Image extension not supported.");
        return;
      }
    }
  }

  get_municipalities(city) {
    this.all_municipalities = [];
    this.municipality = null;
    this.all_microlocations = [];
    this.microlocation = null;
    this.all_streets = [];
    this.street = null;
    this.city_service.get_city(city).subscribe((res: City) => {
      this.all_municipalities = res.municipalities;
    })
  }

  get_microlocations(municipality) {
    this.all_microlocations = [];
    this.microlocation = null;
    this.all_streets = [];
    this.street = null;
    this.municipality_service.get_municipality(municipality).subscribe((res: Municipality) => {
      this.all_microlocations = res.microlocations;
    })
  }

  get_streets(microlocation) {
    this.all_streets = [];
    this.street = null;
    this.microlocation_sevice.get_microlocation(microlocation).subscribe((res: Microlocation) => {
      this.all_streets = res.streets;
    })
  }

  add_real_estate() {

    if (this.images.length < 3 || this.images.length > 6) {
      this.set_message("Please upload 3 to 6 images.")
      return;
    }

    if (this.add_with_json) {
      if (this.json_data != null) {
        this.json_data["advertiser"] = this.user.username;
        this.json_data["agency"] = this.user.agency;
        this.json_data["images"] = this.images;
        this.json_data["sold"] = 0;
        this.json_data["last_updated"] = this.yesterday;
        this.real_estate_service.add_real_estate(this.json_data).subscribe(res => {
          alert(res['message']);
        })
      } else {
        this.set_message("No file selected.");
      }
      return;
    }

    this.set_message(null);

    
    if (this.price == null) this.set_message("Price required.");
    if (this.monthly_utilities == null) this.set_message("Monthly utilities required.");
    if (this.parking == null || this.parking == '') this.set_message("Parking required.");
    if (this.total_floors == null) this.set_message("Total floors required.");
    if (this.floor == null) this.set_message("Floor required.");
    if (this.heating == null || this.heating == '') this.set_message("Heating required.");
    if (this.state == null || this.state == '') this.set_message("State required.");
    if (this.construction_year == null) this.set_message("Construction year required.");
    if (this.rooms == null) this.set_message("Rooms required.");
    if (this.area == null) this.set_message("Area required.");
    if (this.street == null || this.street == '') this.set_message("Street required.");
    if (this.microlocation == null || this.microlocation == '') this.set_message("Microlocation required.");
    if (this.municipality == null || this.municipality == '') this.set_message("Municipality required.");
    if (this.city == null || this.city == '') this.set_message("City required.");
    if (this.name == null || this.name == '') this.set_message("Name required.");

    if (this.message != null) return;

    this.json_data = JSON.parse(JSON.stringify({
      name: this.name,
      city: this.city,
      municipality: this.municipality,
      microlocation: this.microlocation,
      street: this.street,
      area: this.area,
      rooms: this.rooms,
      construction_year: this.construction_year,
      state: this.state,
      heating: this.heating,
      floor: this.floor,
      total_floors: this.total_floors,
      parking: this.parking,
      monthly_utilities: this.monthly_utilities,
      price: this.price,
      about: this.about,
      characteristics: this.characteristics,
      advertiser: this.user.username,
      agency: this.user.agency,
      images: this.images,
      sold: 0,
      last_updated: this.yesterday,
      bus_lines: this.bus_lines
    }));
    this.real_estate_service.add_real_estate(this.json_data).subscribe(res => {
      alert(res['message']);
    })
  }

  add_characteristic(characteristic) {
    if (this.characteristics.includes(characteristic))
      this.characteristics.splice(this.characteristics.indexOf(characteristic), 1);
    else
      this.characteristics.push(characteristic);
  }

  has_characteristic(characteristic) {
    return this.characteristics.includes(characteristic)
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  add_bus_line() {
    
  }

  user: User;

  add_with_json: boolean = false;
  name: string;
  city: string;
  municipality: string;
  microlocation: string;
  street: string;
  area: number;
  rooms: number;
  construction_year: number;
  state: string; 
  heating: string;
  floor: number;
  total_floors: number;
  parking: string;
  monthly_utilities: number;
  price: number;
  about: string;
  characteristics: Array<string> = [];
  images: Array<string> = [];
  message: string;
  bus_lines: Array<number>;

  all_characteristics: Array<Characteristic>;

  json_data: JSON = null;

  image_select: string = 'Add images';
  json_select: string = 'Import';

  yesterday: Date;
  all_bus_lines: Array<number> = [2, 4, 7, 9, 13, 17, 21, 27, 28, 31, 33, 35, 37, 43, 48, 50, 66, 74, 99];

  all_cities: Array<City>;
  all_municipalities: Array<string>;
  all_microlocations: Array<string>;
  all_streets: Array<string>;
}
