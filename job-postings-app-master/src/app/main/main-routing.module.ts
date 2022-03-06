import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdApplicantsComponent } from './advertisment/ad-applicants/ad-applicants.component';
import { AdReactiveFormComponent } from './advertisment/ad-reactive-form/ad-reactive-form.component';
import { AdsComponent } from './advertisment/ads/ads.component';

import { MainComponent } from './main.component';
import { MyAdsComponent } from './advertisment/my-ads/my-ads.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'ads',
        component: AdsComponent,
      },
      {
        path: 'ads/create',
        component: AdReactiveFormComponent,

      },
      {
        path: 'ads/edit/:id',
        component: AdReactiveFormComponent,

      },
      {
        path: 'ads/applicants/:id',
        component: AdApplicantsComponent,

      },
      {
        path: 'ads/my-ads',
        component: MyAdsComponent,

      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ads'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
