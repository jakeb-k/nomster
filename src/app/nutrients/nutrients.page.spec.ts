import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NutrientsPage } from './nutrients.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { GetRecipeDetailsService } from '../services/apis/get-recipe-details.service';
import { GoalsService } from '../services/database/goals.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

class MockGetRecipeDetailsService {
  getRecipeNutritionDetails = jasmine.createSpy().and.returnValue(of({
    nutrients: [{ name: 'Protein', amount: 50, unit: 'g', percentOfDailyNeeds: 100 }]
  }));
}

class MockGoalsService {
  loadGoalByType = jasmine.createSpy().and.returnValue(Promise.resolve({ goalAmount: 2500 }));
}

class MockLocation {
  back = jasmine.createSpy('back');
}

describe('NutrientsPage', () => {
  let component: NutrientsPage;
  let fixture: ComponentFixture<NutrientsPage>;
  let getRecipeDetailsService: GetRecipeDetailsService;
  let goalsService: GoalsService;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NutrientsPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: GetRecipeDetailsService, useClass: MockGetRecipeDetailsService },
        { provide: GoalsService, useClass: MockGoalsService },
        { provide: Location, useClass: MockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', '1'], ['loc', 'home']])
            }
          }
        }
      ]
    }).compileComponents();

    

    fixture = TestBed.createComponent(NutrientsPage);
    component = fixture.componentInstance;
    getRecipeDetailsService = TestBed.inject(GetRecipeDetailsService);
    goalsService = TestBed.inject(GoalsService);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load data correctly', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.id).toBe(1);
    expect(component.loc).toBe('home');
    expect(goalsService.loadGoalByType).toHaveBeenCalled();
    expect(getRecipeDetailsService.getRecipeNutritionDetails).toHaveBeenCalledWith(1);
    expect(component.nutrientsArr.length).toBeGreaterThan(0);
  }));

  it('loadGoal should set calorieRatio based on goal', async () => {
    await component.loadGoal();
    expect(component.goal).toBeTruthy();
    expect(component.calorieRatio).toBeGreaterThan(0);
  });

  it('back should navigate to previous location', () => {
    component.back();
    expect(location.back).toHaveBeenCalled();
  });

  // More tests can be added for getNutrition and other logic as needed
}); 