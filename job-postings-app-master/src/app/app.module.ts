import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './main/footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdApplicantsComponent } from './main/advertisment/ad-applicants/ad-applicants.component';
import { AdItemComponent } from './main/advertisment/ad-item/ad-item.component';
import { AdReactiveFormComponent } from './main/advertisment/ad-reactive-form/ad-reactive-form.component';
import { AdsComponent } from './main/advertisment/ads/ads.component';
import { MyAdsComponent } from './main/advertisment/my-ads/my-ads.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    AdsComponent,
    AdItemComponent,
    AdReactiveFormComponent,
    AdApplicantsComponent,
    MyAdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
