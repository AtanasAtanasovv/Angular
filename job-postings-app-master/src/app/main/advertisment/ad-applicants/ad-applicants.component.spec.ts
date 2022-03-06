import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdApplicantsComponent } from './ad-applicants.component';

describe('AdApplicantsComponent', () => {
  let component: AdApplicantsComponent;
  let fixture: ComponentFixture<AdApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
