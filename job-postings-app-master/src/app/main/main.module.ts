
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { AdApplicantsComponent } from './advertisment/ad-applicants/ad-applicants.component';
import { AdItemComponent } from './advertisment/ad-item/ad-item.component';
import { AdReactiveFormComponent } from './advertisment/ad-reactive-form/ad-reactive-form.component';
import { AdsComponent } from './advertisment/ads/ads.component';
import { MainComponent } from './main.component';
import { MyAdsComponent } from './advertisment/my-ads/my-ads.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { NotFoundComponent } from '../not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    AuthModule
  ],
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    AdsComponent,
    AdItemComponent,
    AdReactiveFormComponent,
    AdApplicantsComponent,
    MyAdsComponent,
  ]
})
export class MainModule {
}