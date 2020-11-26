import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationJobsCardListComponent } from './organization-jobs-card-list.component';

describe('OrganizationJobsCardListComponent', () => {
  let component: OrganizationJobsCardListComponent;
  let fixture: ComponentFixture<OrganizationJobsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationJobsCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationJobsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
