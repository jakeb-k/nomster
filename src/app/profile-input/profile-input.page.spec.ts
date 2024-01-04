import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileInputPage } from './profile-input.page';

describe('ProfileInputPage', () => {
  let component: ProfileInputPage;
  let fixture: ComponentFixture<ProfileInputPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
