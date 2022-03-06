import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, switchMap, of, takeUntil } from 'rxjs';
import { User } from 'src/app/auth/models/user.interface';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Ad, AdCategory, AdType } from 'src/app/models/ad.model';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ad-reactive-form',
  templateUrl: './ad-reactive-form.component.html',
  styleUrls: ['./ad-reactive-form.component.css']
})
export class AdReactiveFormComponent implements OnInit, OnDestroy {
  currentUser!: User;

  formGroup!: FormGroup;

  ad: Ad;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adsService: AdsService,
    private authService: AuthenticationService
  ) {
    this.ad = {
      title: "",
      description: "",
      category: "" as AdCategory,
      type: '' as AdType,
      likes: [],
      pendingApplicants: [],
      approvedApplicants: [],
      rejectedApplicants: []
    };
  }

  get titleFormControl(): FormControl {
    return this.formGroup?.get('title') as FormControl;
  }

  get descriptionFormControl(): FormControl {
    return this.formGroup?.get('description') as FormControl;
  }

  get typeFormControl(): FormControl {
    return this.formGroup?.get('type') as FormControl;
  }

  get categoryFormControl(): FormControl {
    return this.formGroup?.get('category') as FormControl;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedUser();
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.adsService.getAd$(params['id']);
        }

        this.initForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.ad = response;

          this.initForm();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const ad: Ad = {
      id: this.formGroup.value.id, // this.ad.id,
      creator: this.currentUser.id,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      category: this.formGroup.value.category,
      type: this.formGroup.value.type
    };

    let request$;
    if (ad.id) {
      request$ = this.adsService.putAd$(ad);
    } else {
      request$ = this.adsService.postAd$(ad);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      id: this.ad.id,
      title: [this.ad.title, [Validators.required]],
      description: [this.ad.description, [Validators.required]],
      type: [this.ad.type, [Validators.required]],
      category: [this.ad.category, [Validators.required]],
    });
  }

  shouldShowTitleRequiredControl(): boolean {
    return this.titleFormControl?.touched && this.titleFormControl?.invalid && this.titleFormControl?.errors?.['required']
  }

  shouldShowDescriptionRequiredControl(): boolean {
    return this.descriptionFormControl?.touched && this.descriptionFormControl?.invalid && this.descriptionFormControl?.errors?.['required']
  }

  shouldShowTypeRequiredControl(): boolean {
    return this.typeFormControl?.touched && this.typeFormControl?.invalid && this.typeFormControl?.errors?.['required']
  }
  
  shouldShowCategoryRequiredControl(): boolean {
    return this.categoryFormControl?.touched && this.categoryFormControl?.invalid && this.categoryFormControl?.errors?.['required']
  }
}
