import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentComponent } from './rent/rent.component';
import { RenterComponent } from './rent/renter/renter.component';
import { RentalmanagerComponent } from './rent/rentalmanager/rentalmanager.component';
import { SearchComponent } from './rent/search/search.component';


const routes: Routes = [
  {path:"" ,component:RentComponent,
    children:[
        {path:'search',component:SearchComponent},
        {path:'renter',component:RenterComponent},
        {path:'rentalmanager',component:RentalmanagerComponent},
        {path:'**',redirectTo:'search'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenthomeRoutingModule { }