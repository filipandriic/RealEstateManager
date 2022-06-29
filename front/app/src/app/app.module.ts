import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { BuyerHomeComponent } from './buyer_home/buyer_home.component';
import { AgentMyRealEstatesComponent } from './agent_my_real_estates/agent_my_real_estates.component';
import { AgentInfoComponent } from './agent_info/agent_info.component';
import { AgentHomeComponent } from './agent_home/agent_home.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { BuyerFavouritesComponent } from './buyer-favourites/buyer-favourites.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatStepperModule} from '@angular/material/stepper';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    BuyerHomeComponent,
    AgentMyRealEstatesComponent,
    AgentInfoComponent,
    AgentHomeComponent,
    RealEstateComponent,
    BuyerFavouritesComponent,
    AdvancedSearchComponent,
    AdminUsersComponent,
    BuyerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgbModule,
    NoopAnimationsModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
