import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private user_service: UserService, private agency_service: AgencyService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.agency_service.get_all().subscribe((agencies: Agency[]) => {
      this.all_agencies = agencies;
    })
    this.get_all_users();
    
    this.get_pending_users();
  }

  register() {
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

    if (this.is_agent) this.type = 'agent';
    else this.type = 'buyer';
    this.user_service.register(this.username, this.password, this.first_name, this.last_name, this.city, this.birthday, this.phone, this.email, this.type, this.agency, this.license, this.image_data, 'accepted').subscribe(res => {
      alert(res['message']);
      this.get_all_users();
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

  set_message(message) {
    this.message = message;
  }

  get_all_users() {
    this.all_users = [];
    this.user_service.get_all().subscribe((users: User[]) => {
      for (let u of users)
        if (u.username != 'admin')
          this.all_users.push(u);
    })
  }

  enable_edit(username: string) {
    this.edit_user = !this.edit_user;

    if (this.edit_user)
      this.user_service.get_by_username(username).subscribe((u: User) => {
        this.username = u.username;
        this.password = u.password;
        this.confirm_password = u.password;
        this.first_name = u.first_name;
        this.last_name = u.last_name;
        this.type = u.type;
        this.city = u.city;
        this.birthday = u.birthday;
        this.phone = u.phone;
        this.email = u.email;
        this.agency = u.agency;
        this.license = u.license;
        this.image_data = u.image;

        if (u.type == 'agent') this.is_agent = true;
        this.image_select = 'Change picture';
      })
    else {
      this.username = null;
      this.password = null;
      this.confirm_password = null;
      this.first_name = null;
      this.last_name = null;
      this.type = null;
      this.city = null;
      this.birthday = null;
      this.phone = null;
      this.email = null;
      this.agency = null;
      this.license = null;
      this.image_data = null;
      this.is_agent = false;
      
      this.image_select = 'Add profile picture';
    }
  }

  delete(username: string) {
    this.user_service.reject_user(username).subscribe(res => {
      alert(res['message']);
      this.get_all_users();
    })
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  edit() {
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

    if (this.is_agent) this.type = 'agent';
    else this.type = 'buyer';
    this.user_service.edit_user(this.username, this.password, this.first_name, this.last_name, this.city, this.birthday, this.phone, this.email, this.type, this.agency, this.license, this.image_data, 'accepted').subscribe(res => {
      alert(res['message']);
      this.get_all_users();
    })
  }

  get_pending_users() {
    this.user_service.get_pending_users().subscribe((res: User[]) => {
      this.pending_users = res;
    })
  }

  accept(username: string) {
    this.user_service.accept_user(username).subscribe(res => {
      alert(res['message']);
      this.get_pending_users();
    })
  }

  reject(username: string) {
    this.user_service.reject_user(username).subscribe(res => {
      alert(res['message']);
      this.get_pending_users();
    })
  }

  user: User;
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
  all_users: User[] = [];
  
  pending_users: User[];

  message: string;

  image_select: string = 'Add profile picture';

  edit_user: boolean = false;
}
