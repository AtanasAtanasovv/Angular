import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AclGuard } from './guards/acl.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdApplicantsComponent } from './main/advertisment/ad-applicants/ad-applicants.component';
import { AdReactiveFormComponent } from './main/advertisment/ad-reactive-form/ad-reactive-form.component';
import { AdsComponent } from './main/advertisment/ads/ads.component';
import { MyAdsComponent } from './main/advertisment/my-ads/my-ads.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'ads',
    component: AdsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ads/create',
    component: AdReactiveFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ads/edit/:id',
    component: AdReactiveFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ads/applicants/:id',
    component: AdApplicantsComponent,
    canActivate: [AclGuard, AuthGuard]
  },
  {
    path: 'ads/my-ads',
    component: MyAdsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent, canActivate: [AuthGuard]
  },
  // { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
