import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NutrientsPage } from './nutrients.page';

describe('NutrientsPage', () => {
  let component: NutrientsPage;
  let fixture: ComponentFixture<NutrientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NutrientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
