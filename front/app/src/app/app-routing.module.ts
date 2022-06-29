import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AgentHomeComponent } from './agent_home/agent_home.component';
import { AgentInfoComponent } from './agent_info/agent_info.component';
import { AgentMyRealEstatesComponent } from './agent_my_real_estates/agent_my_real_estates.component';
import { BuyerFavouritesComponent } from './buyer-favourites/buyer-favourites.component';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';
import { BuyerHomeComponent } from './buyer_home/buyer_home.component';
import { LoginComponent } from './login/login.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'buyer', component: BuyerHomeComponent},
  {path: 'agent', component: AgentHomeComponent},
  {path: 'agent/myRealEstates', component: AgentMyRealEstatesComponent},
  {path: 'agent/info', component: AgentInfoComponent},
  {path: 'buyer/real_estate', component: RealEstateComponent},
  {path: 'buyer/favourites', component: BuyerFavouritesComponent},
  {path: 'buyer/advanced_search', component: AdvancedSearchComponent},
  {path: 'buyer/info', component: BuyerInfoComponent},
  {path: 'admin/users', component: AdminUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
