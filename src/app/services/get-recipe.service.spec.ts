import { TestBed } from '@angular/core/testing';

import { GetRecipeService } from './get-recipe.service';

describe('GetRecipeService', () => {
  let service: GetRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
