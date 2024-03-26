import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetRecipeDetailsService } from './get-recipe-details.service';
import { environment } from 'src/environments/environment';

describe('GetRecipeDetailsService', () => {
  let service: GetRecipeDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetRecipeDetailsService]
    });
    service = TestBed.inject(GetRecipeDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRecipeDetails', () => {
    it('should retrieve recipe details', () => {
      const testId = 123;
      service.getRecipeDetails(testId).subscribe(details => {
        expect(details).toBeTruthy();
      });

      const req = httpMock.expectOne(`https://api.spoonacular.com/recipes/${testId}/information?includeNutrition=true&apiKey=${environment.apiKey}`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: 'recipeDetailsData' });
    });
  });

  describe('getRecipeNutritionDetails', () => {
    it('should retrieve recipe nutrition details', () => {
      const testId = 456;
      service.getRecipeNutritionDetails(testId).subscribe(nutritionDetails => {
        expect(nutritionDetails).toBeTruthy();
      });

      const req = httpMock.expectOne(`https://api.spoonacular.com/recipes/${testId}/nutritionWidget.json?apiKey=${environment.apiKey}`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: 'nutritionDetailsData' });
    });
  });

  // Additional tests to cover more scenarios can be added here
});