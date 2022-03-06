import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  ads: Ad[]
    = [];

  errorMessage: string | undefined;

  constructor(private adsService: AdsService) {
  }

  ngOnInit(): void {
    this.getContent();
  }

  onAdLike(ad: Ad): void {
    this.adsService.putAd$(ad).subscribe({
      next: (response) => {
        const changedAdIndex = this.ads.findIndex(ad => ad.id === response.id);
        const ads = this.ads;
        ads.splice(changedAdIndex, 1, response);

        this.ads = ads;
      }
    });
  }

  onAdCandidate(ad: Ad): void {
    this.adsService.putAd$(ad).subscribe({
      next: (response) => {
        const changedAdIndex = this.ads.findIndex(ad => ad.id === response.id);
        const ads = this.ads;
        ads.splice(changedAdIndex, 1, response);

        this.ads = ads;
      }
    });
  }

  onAdDelete(adId: number): void {
    this.adsService.deleteAd$(adId).subscribe({
      next: (response) => {
        this.ads = this.ads.filter(ad => ad.id !== adId);
      }
    });
  }

  private getContent(): void {
    this.adsService.getAds$().subscribe({
      next: (response: Ad[]) => {
        this.ads = response;
      },
      error: (response: HttpErrorResponse) => {
        this.errorMessage = response.message;
      }
    });
  }
}
