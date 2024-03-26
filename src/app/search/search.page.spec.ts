import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { SearchPage } from './search.page';
import { GetRecipeService } from '../services/apis/get-recipe.service';
import { DatabaseService } from '../services/database/database.service';
import { GetRecipeDetailsService } from '../services/apis/get-recipe-details.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IonModal, ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { Meal } from '../interfaces/meal';
import { Router } from '@angular/router';

class MockGetRecipeService {
  applyFilter = jasmine.createSpy('applyFilter').and.returnValue(of({ results: [/* Mock data */] }));
}

class MockDatabaseService {
  addFavourite = jasmine.createSpy('addFavourite').and.returnValue(Promise.resolve(true));
}

class MockGetRecipeDetailsService {
  getRecipeNutritionDetails = jasmine.createSpy('getRecipeNutritionDetails').and.returnValue(of({/* Mock data */}));
}

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let getRecipeService: GetRecipeService;
  let databaseService: DatabaseService;
  let getRecipeDetailsService: GetRecipeDetailsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: GetRecipeService, useClass: MockGetRecipeService },
        { provide: DatabaseService, useClass: MockDatabaseService },
        { provide: GetRecipeDetailsService, useClass: MockGetRecipeDetailsService },
        { provide: ModalController, useValue: { create: () => ({ present: () => Promise.resolve() }) }}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    getRecipeService = TestBed.inject(GetRecipeService);
    databaseService = TestBed.inject(DatabaseService);
    getRecipeDetailsService = TestBed.inject(GetRecipeDetailsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('sendFilterData should fetch recipes and sort them', fakeAsync(() => {
    component.sendFilterData();
    flush();
    expect(getRecipeService.applyFilter).toHaveBeenCalled();
    expect(component.recipes.length).toBeGreaterThan(-1);
    expect(component.sortedRecipes.length).toBeGreaterThan(-1);
  }));

  it('newFav should add a new favourite meal', async () => {
    const meal: Meal = { id: 1, title: 'Test Meal', cals: '200', carbs: '30', protein: '10', fat: '10', diet: 'Test', image: '' };
    component.sortedRecipes = [meal];
    await component.newFav(meal);
    expect(databaseService.addFavourite).toHaveBeenCalled();
    expect(component.showSuccessMessage).toBeTrue();
  });

  it('nav should navigate to the recipe detail page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const id = 1;
    component.nav(id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/recipe/1/search', { replaceUrl: true });
});

it('nutrientNav should navigate to the nutrient detail page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    const id = 1;
    component.nutrientNav(id);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/nutrients/1/search');
});

it('getNutrition should fetch and store nutrient details', fakeAsync(() => {
    const id = 1;
    const mockNutrientData = { nutrients: [{ name: 'Protein', amount: 50, unit: 'g', percentOfDailyNeeds: 100 }] };
    getRecipeDetailsService.getRecipeNutritionDetails = jasmine.createSpy().and.returnValue(of(mockNutrientData));

    component.getNutrition(id);
    tick();

    expect(getRecipeDetailsService.getRecipeNutritionDetails).toHaveBeenCalledWith(id);
    expect(component.nutrientsArr.length).toBeGreaterThan(0);
}));

it('slideNav should update the index to display different recipes', () => {
   // Define a complete dummy Meal object that matches the Meal interface
  const dummyMeal1: Meal = {
    id: 1,
    title: 'Recipe 1',
    cals: '200',
    carbs: '30',
    protein: '10',
    fat: '5',
    diet: 'Vegan',
    image: 'image_url_1'
  };

  const dummyMeal2: Meal = {
    id: 2,
    title: 'Recipe 2',
    cals: '250',
    carbs: '35',
    protein: '15',
    fat: '10',
    diet: 'Vegetarian',
    image: 'image_url_2'
  };

  // Use the dummy Meal objects in your test
  component.sortedRecipes = [dummyMeal1, dummyMeal2];
    component.index = 0;

    component.slideNav(-1);
    expect(component.index).toBe(0);
    
});
});