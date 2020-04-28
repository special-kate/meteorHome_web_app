import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellPageRoutingModule } from './sell-page-routing.module';
import { SellComponent } from './sell/sell.component';
import { SellManagerComponent } from './sell/sell-manager/sell-manager.component';
import { SellSearchComponent } from './sell/sell-search/sell-search.component';
import { SellViewComponent } from './sell/sell-view/sell-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';

@NgModule({
  declarations: [SellComponent, SellManagerComponent, SellSearchComponent, SellViewComponent],
  imports: [
    CommonModule,
    SellPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    IconsProviderModule
  ],
  exports:[SellComponent]
})
export class SellPageModule { }
