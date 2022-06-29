import { Chart, registerables } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { AgencyService } from '../services/agency.service';
import { UserService } from '../services/user.service';
import { RealEstateService } from '../services/real-estate.service';
import { Microlocation } from '../models/microlocation';
import { MicrolocationService } from '../services/microlocation.service';

@Component({
  selector: 'app-agent_info',
  templateUrl: './agent_info.component.html',
  styleUrls: ['./agent_info.component.css']
})
export class AgentInfoComponent implements OnInit {

  constructor(private router: Router, private user_service: UserService, private agency_service: AgencyService, private real_estate_service: RealEstateService, private microlocation_service: MicrolocationService) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.user = JSON.parse(localStorage.getItem('logged'));
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    
    this.formatted_date = this.format_date(this.user);
    this.phone = this.user.phone;
    this.email = this.user.email;
    this.agency = this.user.agency;
    if (this.user == null) {
      alert("You have been logged out. :(")
      this.router.navigate(['']);
    }
    this.agency_service.get_all().subscribe((agencies: Agency[]) => {
      this.all_agencies = agencies;
    })
    this.microlocation_service.get_all().subscribe((micros: Microlocation[]) => {
      this.all_microlocations = micros;

      if (this.all_microlocations.length > 0)
        this.microlocation = this.all_microlocations[0].name;
        this.chart = new Chart("chart", {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
              label: 'Sales',
              data: [],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            }
          }
        });
    
        this.update_chart();
    })

    
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['']);
  }

  set_message(message) {
    this.message = message;
  }

  format_date(user: User) {
    const date = new Date(user.birthday)
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.'
  }

  enable_edit() {
    this.edit_enabled = !this.edit_enabled;
  }

  update_info() {
    var email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    this.set_message(null);

    if (this.agency == null) this.set_message("Agency required.");
    if (this.email == null || this.email == '') this.set_message("E-mail required.");
    else if (!email_pattern.test(this.email)) this.set_message("Wrong e-mail");
    if (this.phone == null || this.phone == '') this.set_message("Phone required.");
    else if (!phone_pattern.test(this.phone)) this.set_message("Wrong phone");

    

    if (this.message != null) return;

    this.user_service.update_user_info(this.user.username, this.phone, this.email, this.agency).subscribe(res => {
      alert(res['message'])
      if (res['message'] == 'User info updated') {
        this.user.phone = this.phone;
        this.user.email = this.email;
        this.user.agency = this.agency;
        localStorage.setItem('logged', JSON.stringify(this.user));
        this.update_chart();
      }
    })
  }

  update_chart() {
    let data;
    this.chart.data.datasets[0].data = [];

    if (this.user.agency == null || this.user.agency == '') {
      for (let i = 1; i < 13; i++) {
        data = {
          month: i,
          microlocation: this.microlocation
        }

        this.real_estate_service.get_num_advertiser(data).subscribe(res => {
          this.chart.data.datasets[0].data[i - 1] = res['number'];
          this.chart.update();
        })
      }
    }
    else {
      for (let i = 1; i < 13; i++) {
        data = {
          month: i,
          agency: this.user.agency,
          microlocation: this.microlocation
        }

        this.real_estate_service.get_num_agency(data).subscribe(res => {
          this.chart.data.datasets[0].data[i - 1] = res['number'];
          this.chart.update();
        })
      }
    }
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

  user: User;
  message: string;

  phone: string;
  email: string;
  agency: string;
  edit_enabled: boolean = false;
  all_agencies: Agency[];
  change_password_window: boolean = false;
  old_password: string;
  new_password: string;
  confirm_password: string;
  formatted_date: string;

  microlocation: string;

  chart: Chart;
  all_microlocations: Array<Microlocation>;
}
