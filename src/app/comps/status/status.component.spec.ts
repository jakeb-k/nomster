import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusComponent } from './status.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

class MockDatabaseService {
  deleteGrocery = jasmine.createSpy('deleteGrocery').and.returnValue(Promise.resolve(true));
}

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let databaseService: MockDatabaseService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DatabaseService, useClass: MockDatabaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    databaseService = TestBed.inject(DatabaseService) as unknown as MockDatabaseService;
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should undo grocery addition', async () => {
    component.item = { name: 'Test Item' };
    await component.undoAddGrocery();
    expect(databaseService.deleteGrocery).toHaveBeenCalledWith('Test Item');
  });

  it('should navigate based on message', () => {
    component.message = "New favourite added!";
    component.navGoals();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/favs');

    component.message = "Added all groceries!";
    component.navGoals();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/grocery');

    component.message = "Other message";
    component.navGoals();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/profile-input');
  });

  it('should update component styles based on status', () => {
    component.status = true;
    component.updateCompByStatus();
    expect(component.styles.icon).toEqual("thumbs-up");
    expect(component.styles.iconColor).toEqual("success");

    component.status = false;
    component.updateCompByStatus();
    expect(component.styles.icon).toEqual("thumbs-down-outline");
    expect(component.styles.iconColor).toEqual("danger");
  });

  // More tests can be added for other methods and properties as needed
});
