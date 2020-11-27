import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardItemComponent } from './user-card-item.component';

describe('UserCardItemComponent', () => {
  let component: UserCardItemComponent;
  let fixture: ComponentFixture<UserCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
