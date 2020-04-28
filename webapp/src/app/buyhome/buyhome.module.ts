import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyComponent } from './buy/buy.component';
import { SearchhomeService } from './buy/searchhome/searchhome.service';
import { BuyerComponent } from './buy/buyer/buyer.component';
import { SearchhomeComponent } from './buy/searchhome/searchhome.component';
import { BuyhomeRoutingModule } from './buyhome-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [BuyComponent,BuyerComponent,SearchhomeComponent],
  imports: [
    CommonModule,
    BuyhomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    CommonModule,
    IconsProviderModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyB3uOUM6mT91EUowNg1MyRBM0BBUgYQXZ8',
        libraries:['places']
      })
  ],
  exports:[BuyComponent],
  providers:[SearchhomeService]
})

export class BuyhomeModule { }
