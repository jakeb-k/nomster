import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GroceryPage } from './grocery.page';
import { DatabaseService } from '../services/database/database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { Grocery } from '../interfaces/grocery';
import { Router } from '@angular/router';

class MockDatabaseService {
  loadGrocery = jasmine.createSpy().and.returnValue(Promise.resolve());
  getGrocery = jasmine.createSpy().and.returnValue(() => []);
  addGrocery = jasmine.createSpy().and.returnValue(Promise.resolve(true));
  deleteGrocery = jasmine.createSpy().and.returnValue(Promise.resolve(true));
  deleteAllGroceries = jasmine.createSpy().and.returnValue(Promise.resolve(true));
}

class MockModalController {
  dismiss = jasmine.createSpy().and.returnValue(Promise.resolve(true));
}

describe('GroceryPage', () => {
  let component: GroceryPage;
  let fixture: ComponentFixture<GroceryPage>;
  let databaseService: MockDatabaseService;
  let modalController: MockModalController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroceryPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService },
        { provide: ModalController, useClass: MockModalController },
        ChangeDetectorRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryPage);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService) as unknown as MockDatabaseService;
    modalController = TestBed.inject(ModalController) as unknown as MockModalController;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load groceries on init', async () => {
    await component.ngOnInit();
    expect(databaseService.loadGrocery).toHaveBeenCalled();
    expect(databaseService.getGrocery).toHaveBeenCalled();
    expect(component.groceries).toEqual([]);
  });

  it('should add grocery and refresh list', async () => {
    await component.addToGroceries();
    expect(databaseService.addGrocery).toHaveBeenCalled();
    expect(databaseService.loadGrocery).toHaveBeenCalled();
  });

  it('should delete a grocery and refresh list', async () => {
    const grocery: Grocery = { id: 1, name: 'Apple', isBought: 0, aisle: 'Produce' };
    await component.deleteGrocery(grocery);
    expect(databaseService.deleteGrocery).toHaveBeenCalledWith(grocery.name.toString());
    expect(databaseService.loadGrocery).toHaveBeenCalled();
  });

  it('should delete all groceries and refresh list', async () => {
    await component.deleteAllGroceries();
    expect(databaseService.deleteAllGroceries).toHaveBeenCalled();
    expect(databaseService.loadGrocery).toHaveBeenCalled();
  });

  it('should navigate to specified path', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    component.nav('path');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/path');
  });

  it('should dismiss the modal', () => {
    component.cancel();
    expect(modalController.dismiss).toHaveBeenCalled();
  });

  // More tests can be added for other methods and functionalities as needed
});
