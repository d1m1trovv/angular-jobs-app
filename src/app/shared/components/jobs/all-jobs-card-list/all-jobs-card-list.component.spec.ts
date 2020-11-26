import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobsCardListComponent } from './all-jobs-card-list.component';

describe('AllJobsCardListComponent', () => {
  let component: AllJobsCardListComponent;
  let fixture: ComponentFixture<AllJobsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJobsCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJobsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
