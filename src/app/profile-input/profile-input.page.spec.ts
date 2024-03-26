import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileInputPage } from './profile-input.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { GoalsService } from '../services/database/goals.service';
import { ResetService } from '../services/database/reset.service';

class MockGoalsService {
  loadGoals = jasmine.createSpy('loadGoals');
  getGoals = jasmine.createSpy('getGoals').and.returnValue([]);
  addGoal = jasmine.createSpy('addGoal').and.returnValue(Promise.resolve(true));
  deleteGoalById = jasmine.createSpy('deleteGoalById').and.returnValue(Promise.resolve(true));
  updateGoal = jasmine.createSpy('updateGoal').and.returnValue(Promise.resolve(true));
  resetGoalProgress = jasmine.createSpy('resetGoalProgress').and.returnValue(Promise.resolve(true));
}

class MockResetService {
  timeCheck = jasmine.createSpy('timeCheck').and.returnValue(Promise.resolve());
}

class MockModalController {
  create = jasmine.createSpy('create').and.returnValue(Promise.resolve({
    present: () => Promise.resolve(),
    onDidDismiss: () => Promise.resolve({ data: null })
  }));
  dismiss = jasmine.createSpy('dismiss').and.returnValue(Promise.resolve(true));
}

describe('ProfileInputPage', () => {
  let component: ProfileInputPage;
  let fixture: ComponentFixture<ProfileInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInputPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: GoalsService, useClass: MockGoalsService },
        { provide: ResetService, useClass: MockResetService },
        { provide: ModalController, useClass: MockModalController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInputPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});