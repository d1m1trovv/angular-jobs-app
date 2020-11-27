import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardListViewComponent } from './user-card-list-view.component';

describe('UserCardListViewComponent', () => {
  let component: UserCardListViewComponent;
  let fixture: ComponentFixture<UserCardListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
