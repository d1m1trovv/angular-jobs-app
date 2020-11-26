import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypesCardListComponent } from './job-types-card-list.component';

describe('JobTypesCardListComponent', () => {
  let component: JobTypesCardListComponent;
  let fixture: ComponentFixture<JobTypesCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTypesCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTypesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
