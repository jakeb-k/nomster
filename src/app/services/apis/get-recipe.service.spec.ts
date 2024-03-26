import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetRecipeService } from './get-recipe.service';

describe('GetRecipeService', () => {
  let service: GetRecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetRecipeService]
    });
    service = TestBed.inject(GetRecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRecipe', () => {
    it('should retrieve recipe data and handle session storage', () => {
      const testQuery = 'chicken';
      service.getRecipe(testQuery).subscribe(res => {
        expect(res).toBeTruthy();
        expect(sessionStorage.getItem('query')).toBe(testQuery);
      });

      const req = httpMock.expectOne(request => request.url.includes('complexSearch'));
      expect(req.request.method).toBe('GET');
      req.flush({ data: 'test' });
    });
  });

  describe('applyFilter', () => {
    it('should fetch filtered recipes and update session storage', () => {
      const filter = {
        query:'', 
        ingredients: 'tomatoes',
        maxCals: '500',
        maxCarbs: '',
        maxFat: '',
        minProtein: '',
        cuisine: 'Italian',
        type: '',
        intolerances: [''],
        diet: ['']
      };

      service.applyFilter(filter).subscribe(res => {
        expect(res).toBeTruthy();
        const storedFilter = sessionStorage.getItem('filter');
        expect(storedFilter).toBeTruthy();
        expect(JSON.parse(storedFilter!)).toEqual(filter);
      });

      const req = httpMock.expectOne(request => request.url.includes('complexSearch'));
      console.log(req); 
      expect(req.request.method).toBe('GET');
      expect(req.request.urlWithParams.includes('includeIngredients=tomatoes')).toBeTrue();
      expect(req.request.urlWithParams.includes('maxCalories=500')).toBeTrue();
      expect(req.request.urlWithParams.includes('cuisine=Italian')).toBeTrue();
      req.flush({ data: 'test' });
    });
  });

  // Add more tests as necessary for different scenarios and parameters
});