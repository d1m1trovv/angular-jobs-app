import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardItemComponent } from './job-card-item.component';

describe('JobCardItemComponent', () => {
  let component: JobCardItemComponent;
  let fixture: ComponentFixture<JobCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
