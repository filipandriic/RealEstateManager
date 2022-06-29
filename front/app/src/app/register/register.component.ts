import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { AgencyService } from '../services/agency.service';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  token: string|undefined;

  constructor(private user_service: UserService, private router: Router, private agency_service: AgencyService) {
    this.token = undefined;
  }

  username: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  type: string;
  city: string;
  birthday: Date;
  phone: string;
  email: string;
  agency: string;
  license: string;
  image_data: string;

  is_agent: boolean = false;
  all_agencies: Agency[];

  message: string;

  image_select: string = 'Add profile picture'

  ngOnInit(): void {
    this.agency_service.get_all().subscribe((agencies: Agency[]) => {
      this.all_agencies = agencies;
    })
  }

  set_message(message) {
    this.message = message;
  }

  register(form: NgForm) {
    var email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    this.set_message(null);

    
    if (this.image_data == null || this.image_data == '') this.set_message("Picture required.");
    if (this.is_agent &&  (this.license == null || this.license == '')) this.set_message("License required.");
    if (this.is_agent &&  this.agency == null) this.set_message("Agency required.");
    if (this.email == null || this.email == '') this.set_message("E-mail required.");
    else if (!email_pattern.test(this.email)) this.set_message("Wrong e-mail");
    if (this.phone == null || this.phone == '') this.set_message("Phone required.");
    else if (!phone_pattern.test(this.phone)) this.set_message("Wrong phone");
    if (this.birthday == null) this.set_message("Birthday required");
    if (this.city == null || this.city == '') this.set_message("City required.");
    if (this.confirm_password != this.password) this.set_message("Passwords don't match.");
    if (this.confirm_password == null || this.confirm_password == '') this.set_message("Please confirm your password.");
    if (this.password == null || this.password == '') this.set_message("Password required.");
    if (this.username == null || this.username == '') this.set_message("Username required.");
    if (this.last_name == null || this.last_name == '') this.set_message("Last name required.");
    if (this.first_name == null || this.first_name == '') this.set_message("First name required.");

    

    if (this.message != null) return;

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      this.set_message("reCAPTCHA invalid.")
      return;
    }

    if (this.is_agent) this.type = 'agent';
    else this.type = 'buyer';
    this.user_service.register(this.username, this.password, this.first_name, this.last_name, this.city, this.birthday, this.phone, this.email, this.type, this.agency, this.license, this.image_data, 'pending').subscribe(res => {
      alert(res['message']);
    })
  }

  on_image_select(event: Event) {
    console.log(event)

    const file = (event.target as HTMLInputElement).files[0];
    const allowed_file_types = ['image/png', 'image/jpg', 'image/jpeg'];

    if (allowed_file_types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        var image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          if (image.width <= 300 && image.width >= 100 && image.height <= 300 && image.height >= 100) {
            this.image_data = image.src;
            this.image_select = file.name;
            this.set_message('');
          }
          else {
            this.set_message("Can't upload this image.");
            return;
          }
        }
        
      };
      reader.readAsDataURL(file);
    } else {
      this.set_message("Image extension not supported.");
      return;
    }
  }

}
