import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Ad } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ad-applicants',
  templateUrl: './ad-applicants.component.html',
  styleUrls: ['./ad-applicants.component.css']
})
export class AdApplicantsComponent implements OnInit {
  ad!: Ad;
  applicants: any[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private adsService: AdsService,
    private authService: AuthenticationService,
  ) { }

  onApprove(userId: number): void {
    this.adsService.putAd$({
      ...this.ad,
      pendingApplicants: this.ad.pendingApplicants?.filter(id => id !== userId) || [],
      approvedApplicants: [...(this.ad.approvedApplicants || []), userId]
    })
      .subscribe({
        next: () => {
          this.applicants = this.applicants.filter(user => user.id !== userId)
        }
      });
  }

  onReject(userId: number): void {
    this.adsService.putAd$({
      ...this.ad,
      pendingApplicants: this.ad.pendingApplicants?.filter(id => id !== userId) || [],
      rejectedApplicants: [...this.ad.approvedApplicants || [], userId]
    })
      .subscribe({
        next: () => {
          this.applicants = this.applicants.filter(user => user.id !== userId)
        }
      });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.adsService.getAd$(params['id']);
        }

        return of(null);
      }),
    ).subscribe({
      next: (response) => {
        if (response) {
          this.ad = response;
          this.getAdApplicants(response);
        }
      }
    });
  }

  private getAdApplicants(ad: Ad) {
    this.authService.getUsers().subscribe({
      next: (response) => {
        this.applicants = response.reduce<User[]>((applicants, user) => {
          if (ad.pendingApplicants?.some(applicant => applicant === user.id)) {
            applicants.push(user)
          }

          return applicants
        }, [])

      }
    });
  }
}
