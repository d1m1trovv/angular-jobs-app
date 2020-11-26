import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCardListViewComponent } from './jobs-card-list-view.component';

describe('JobsCardListViewComponent', () => {
  let component: JobsCardListViewComponent;
  let fixture: ComponentFixture<JobsCardListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsCardListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
