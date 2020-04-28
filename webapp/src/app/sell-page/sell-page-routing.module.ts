import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellComponent } from './sell/sell.component';
import { SellManagerComponent } from './sell/sell-manager/sell-manager.component';
import { SellSearchComponent } from './sell/sell-search/sell-search.component';
import { SellViewComponent } from './sell/sell-view/sell-view.component';


const routes: Routes = [
  {
    path:"" , component:SellComponent,
    children:[
      {path:'sell-manager', component:SellManagerComponent},
      {path:'sell-search', component:SellSearchComponent},
      {path:'sell-view', component:SellViewComponent},
      {path:'**', redirectTo:'sell-search'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellPageRoutingModule { }
