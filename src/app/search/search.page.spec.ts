import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SearchPage } from './search.page';
import { GetRecipeService } from '../services/apis/get-recipe.service';
import { DatabaseService } from '../services/database/database.service';
import { GetRecipeDetailsService } from '../services/apis/get-recipe-details.service';
import { Filter } from '../interfaces/filter';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let recipeGetterSpy: jasmine.SpyObj<GetRecipeService>;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;
  let recipeDetailGetterSpy: jasmine.SpyObj<GetRecipeDetailsService>;


  beforeEach(async () => {
    recipeGetterSpy = jasmine.createSpyObj('GetRecipeService', ['applyFilter']);
    databaseServiceSpy = jasmine.createSpyObj('DatabaseService', ['addFavourite']);
    recipeDetailGetterSpy = jasmine.createSpyObj('GetRecipeDetailsService', ['getRecipeNutritionDetails']);
  

    await TestBed.configureTestingModule({
      declarations: [SearchPage],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: GetRecipeService, useValue: recipeGetterSpy },
        { provide: DatabaseService, useValue: databaseServiceSpy },
        { provide: GetRecipeDetailsService, useValue: recipeDetailGetterSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit is called here
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sendFilterData', () => {
    it('should call applyFilter with the filterOps and process the response', () => {
      const response = { results: Array(10), error: null };
      recipeGetterSpy.applyFilter.and.returnValue(of(response));
  
      component.sendFilterData();
  
      expect(recipeGetterSpy.applyFilter).toHaveBeenCalledWith(component.filterOps);
      expect(component.recipes.length).toBe(10); // Assuming you want to check if the recipes are populated correctly

      // Add more expectations as necessary to verify the state of the component after the method call
    });

    it('should handle no results properly', () => {
      const response = { results: [], error: 'No data' };
      recipeGetterSpy.applyFilter.and.returnValue(of(response));

      component.sendFilterData();

      // This assumes your service logic or component sets `noResults` to true
      // when there are no results. Adjust as needed for your logic.
      expect(component.noResults).toBeTrue();
    });
  });

  // Additional tests for other methods and functionalities
});
