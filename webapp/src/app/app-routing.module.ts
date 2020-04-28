import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path:'home',component:HomepageComponent},
  {path:'rent',loadChildren: './renthome/renthome.module#RenthomeModule'},
  {path:'sell',loadChildren: './sell-page/sell-page.module#SellPageModule'},
  {path:'buy',loadChildren: './buyhome/buyhome.module#BuyhomeModule'},
  {path:'login',component:LoginComponent},
  {path:'signup/new',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
