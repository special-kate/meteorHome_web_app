import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent/rent.component';
import { SearchService } from './rent/search/search.service';
import { RentalmanagerComponent } from './rent/rentalmanager/rentalmanager.component';
import { RenterComponent } from './rent/renter/renter.component';
import { SearchComponent } from './rent/search/search.component';
import { RenthomeRoutingModule } from './renthome-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';


@NgModule({
  declarations: [RentComponent,RentalmanagerComponent,RenterComponent,SearchComponent],
  imports: [
    CommonModule,
    RenthomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CommonModule,
    IconsProviderModule
  ],
  exports:[RentComponent],
  providers:[SearchService]
})

export class RenthomeModule { }
