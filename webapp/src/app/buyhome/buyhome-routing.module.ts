import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { BuyerComponent } from './buy/buyer/buyer.component';

import { SearchhomeComponent } from './buy/searchhome/searchhome.component';


const routes: Routes = [
  {path:"" ,component:BuyComponent,
    children:[
        {path:'searchhome',component:SearchhomeComponent},
        {path:'buyer',component:BuyerComponent},
        {path:'**',redirectTo:'searchhome'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyhomeRoutingModule { }