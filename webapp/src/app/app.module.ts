import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RenthomeModule } from './renthome/renthome.module';
import { SellPageModule } from './sell-page/sell-page.module';
import { BuyhomeModule } from './buyhome/buyhome.module';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { translationLoaderFactory } from './common/i18n/translate.loader';
import { translationFactory } from './common/i18n/translate.initializer';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RenthomeModule,
    SellPageModule,
    BuyhomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    // config i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationLoaderFactory,
        deps: [ HttpClient ],
      }
    }),
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    // in memory DB
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {
    //     dataEncapsulation: false,
    //     passThruUnknownUrl: true,
    //     put204: false // return entity after PUT/update
    //   }
    // )
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: translationFactory,
    deps: [ TranslateService ],
    multi: true
  }, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
