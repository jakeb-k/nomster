import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OnboardingPage } from './onboarding.page';
import { UserService } from '../services/database/user.service';
import { GoalsService } from '../services/database/goals.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

class MockUserService {
  addUser = jasmine.createSpy('addUser').and.returnValue(Promise.resolve(true));
}

class MockGoalsService {
  loadGoalByType = jasmine.createSpy('loadGoalByType').and.returnValue(Promise.resolve(null));
  deleteGoals = jasmine.createSpy('deleteGoals').and.returnValue(Promise.resolve(true));
  addGoal = jasmine.createSpy('addGoal').and.returnValue(Promise.resolve(true));
  createInitialGoals = jasmine.createSpy('createInitialGoals').and.returnValue(Promise.resolve(true));
}

describe('OnboardingPage', () => {
  let component: OnboardingPage;
  let fixture: ComponentFixture<OnboardingPage>;
  let userService: UserService;
  let goalsService: GoalsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnboardingPage],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: GoalsService, useClass: MockGoalsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingPage);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    goalsService = TestBed.inject(GoalsService);
    router = TestBed.get(Router);

    spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call loadGoalCheck', fakeAsync(() => {
    spyOn(component, 'loadGoalCheck');
    component.ngOnInit();
    tick();
    expect(component.loadGoalCheck).toHaveBeenCalled();
  }));

  it('selectIcon should set selectedIcon', () => {
    component.selectIcon('0');
    expect(component.selectedIcon).toBe('0');
  });

  it('selectIcon2 should set selectedGenderIcon', () => {
    component.selectIcon2('1');
    expect(component.selectedGenderIcon).toBe('1');
  });

  it('sendUser should add user and navigate to login', fakeAsync(() => {
    component.newUser = { ...component.newUser, height: 180, weight: 75, age: 25, activityLevel: 1.2 };
    component.dateInput = '1990-01-01';
    component.selectedIcon = '0';
    component.selectedGenderIcon = '1';
    component.sendUser();
    tick();
    expect(userService.addUser).toHaveBeenCalled();
    expect(goalsService.deleteGoals).toHaveBeenCalled();
    expect(goalsService.addGoal).toHaveBeenCalled();
    expect(goalsService.createInitialGoals).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  // More detailed tests for calculateAge, calculateCI, caloricIntakeGoalInit, loadGoalCheck, etc., can be added similarly
});
