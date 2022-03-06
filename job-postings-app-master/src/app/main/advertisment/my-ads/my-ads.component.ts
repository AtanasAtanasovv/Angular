import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  approvedAds!: Ad[];
  pendingAds!: Ad[];
  rejectedAds!: Ad[];
  currentUser!: User;

  errorMessage: string | undefined;

  constructor(
    private adsService: AdsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedUser();
    this.getContent();
  }

  private getContent(): void {
    this.adsService.getAds$().subscribe({
      next: (response: Ad[]) => {
        this.approvedAds = response.filter(ad => ad.approvedApplicants?.some(id => this.currentUser.id === id))
        this.rejectedAds = response.filter(ad => ad.rejectedApplicants?.some(id => this.currentUser.id === id))
        this.pendingAds = response.filter(ad => ad.pendingApplicants?.some(id => this.currentUser.id === id))
      },
      error: (response: HttpErrorResponse) => {
        this.errorMessage = response.message;
      }
    });
  }
}
