import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCardListComponent } from './jobs-card-list.component';

describe('JobsCardListComponent', () => {
  let component: JobsCardListComponent;
  let fixture: ComponentFixture<JobsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
