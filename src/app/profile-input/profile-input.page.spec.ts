import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProfileInputPage } from './profile-input.page';
import { GoalsService } from '../services/database/goals.service';
import { ResetService } from '../services/database/reset.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';

class MockGoalsService {
  loadGoals = jasmine.createSpy('loadGoals').and.returnValue(Promise.resolve());
  getGoals = jasmine.createSpy('getGoals').and.returnValue(of([{ id: 1, type: 'Calorie Intake', goalAmount: 2000, goalProgress: 1500 }]));
  addGoal = jasmine.createSpy('addGoal').and.returnValue(Promise.resolve(true));
  deleteGoalById = jasmine.createSpy('deleteGoalById').and.returnValue(Promise.resolve(true));
  updateGoal = jasmine.createSpy('updateGoal').and.returnValue(Promise.resolve(true));
  resetGoalProgress = jasmine.createSpy('resetGoalProgress').and.returnValue(Promise.resolve(true));
}

class MockResetService {
  timeCheck = jasmine.createSpy('timeCheck').and.returnValue(Promise.resolve(true));
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve({
    present: () => Promise.resolve(),
    onDidDismiss: () => Promise.resolve({ data: { id: 1, goalAmount: 1000 } })
  }));
  dismiss = jasmine.createSpy('dismiss').and.returnValue(Promise.resolve(true));
}

describe('ProfileInputPage', () => {
  let component: ProfileInputPage;
  let fixture: ComponentFixture<ProfileInputPage>;
  let goalsService: MockGoalsService;
  let resetService: MockResetService;
  let modalController: MockModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInputPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: GoalsService, useClass: MockGoalsService },
        { provide: ResetService, useClass: MockResetService },
        { provide: ModalController, useClass: MockModalController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInputPage);
    component = fixture.componentInstance;
    goalsService = TestBed.inject(GoalsService) as unknown as MockGoalsService;
    resetService = TestBed.inject(ResetService) as unknown as MockResetService;
    modalController = TestBed.inject(ModalController) as unknown as MockModalController;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load goals and perform time check', async () => {
    await component.ngOnInit();
    expect(goalsService.loadGoals).toHaveBeenCalled();
    expect(goalsService.getGoals).toHaveBeenCalled();
    expect(resetService.timeCheck).toHaveBeenCalled();
  });

  it('initGoal should add a new goal and show success message', async () => {
    await component.initGoal();
    expect(goalsService.addGoal).toHaveBeenCalledWith(component.newGoal);
    expect(component.showSuccessMessage).toBeTrue();
  });

  it('deleteGoal should remove the specified goal', async () => {
    const goal = { id: 1, type: 'Calorie Intake', goalAmount: 2000, goalProgress: 1500 };
    await component.deleteGoal(goal);
    expect(goalsService.deleteGoalById).toHaveBeenCalledWith(goal.id.toString());
  });

  it('sendGoalProgress should update goal progress and show success message', async () => {
    const goalId = 1;
    const goalAmount = 1000;
    await component.sendGoalProgress(goalId, goalAmount);
    expect(goalsService.updateGoal).toHaveBeenCalledWith(goalId, goalAmount);
    expect(component.goalUpdateSuccess).toBeTrue();
  });

  it('openModal should open the update goal modal', async () => {
    const goalId = 1;
    await component.openModal(goalId);
    expect(modalController.create).toHaveBeenCalled();
  });

  it('handleModalData should process returned data from modal', async () => {
    const modalData =[1, 1000] ;
    component.handleModalData(modalData);
    expect(goalsService.updateGoal).toHaveBeenCalledWith(modalData[0], modalData[1]);
  });

  
  it('resetGoalProgress should reset the progress of a specified goal', async () => {
    const goalId = 1;
    await component.resetGoalProgress(goalId);
    expect(goalsService.resetGoalProgress).toHaveBeenCalledWith(goalId);
    expect(component.goalUpdateSuccess).toBeTrue();
  });

  it('navHome should navigate to the login page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    component.back();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});