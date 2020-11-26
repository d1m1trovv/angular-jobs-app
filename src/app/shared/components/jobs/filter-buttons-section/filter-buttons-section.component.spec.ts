import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonsSectionComponent } from './filter-buttons-section.component';

describe('FilterButtonsSectionComponent', () => {
  let component: FilterButtonsSectionComponent;
  let fixture: ComponentFixture<FilterButtonsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterButtonsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterButtonsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
