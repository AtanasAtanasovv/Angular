import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Ad } from 'src/app/models/ad.model';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: []
})
export class AdItemComponent implements OnInit {
  currentUser!: User;

  @Input()
  ad!: Ad;

  @Output() adCandidated: EventEmitter<Ad> = new EventEmitter<Ad>();
  @Output() adLiked: EventEmitter<Ad> = new EventEmitter<Ad>();
  @Output() adDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedUser()
  }

  onLike(): void {
    const userId = this.currentUser.id;
    const adLikes = this.ad.likes || [];
    const likes = userId
      ? this.shouldShowLike()
        ? adLikes.filter(id => id !== userId)
        : [...adLikes, userId]
      : adLikes;
    this.adLiked.emit({ ...this.ad, likes });
  }

  onCandidate(): void {
    const pendingApplicants = this.currentUser.id ? [...(this.ad.pendingApplicants || []), this.currentUser.id] : this.ad.pendingApplicants
    this.adCandidated.emit({ ...this.ad, pendingApplicants });
  }

  onDelete(): void {
    this.adDeleted.emit(this.ad.id);
  }

  shouldShowLike(): boolean {
    return Boolean(this.ad.likes && this.ad.likes.findIndex(like => like === this.currentUser.id) > -1)
  }

  shouldCandidate(): boolean {
    const allAdApplicants = [...this.ad.approvedApplicants || [], ...this.ad.pendingApplicants || [], ...this.ad.rejectedApplicants || []]
    return allAdApplicants.every(id => id !== this.currentUser.id) && this.ad.creator !== this.currentUser.id
  }

  shouldShowApplicantsLink(): boolean {
    return this.ad.creator === this.currentUser.id
  }
}
