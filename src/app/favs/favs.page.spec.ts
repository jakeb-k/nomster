import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavsPage } from './favs.page';

describe('FavsPage', () => {
  let component: FavsPage;
  let fixture: ComponentFixture<FavsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FavsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
