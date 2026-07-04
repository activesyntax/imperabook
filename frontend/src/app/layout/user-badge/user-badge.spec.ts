import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBadge } from './user-badge';

describe('UserBadge', () => {
  let component: UserBadge;
  let fixture: ComponentFixture<UserBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(UserBadge);

    fixture.componentRef.setInput('name', 'John Doe');
    fixture.componentRef.setInput('library', 'Personal library');
    fixture.componentRef.setInput('avatarUrl', "/assets/img/avatar.png");

    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
