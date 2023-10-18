import { TestBed } from '@angular/core/testing';

import { GetRecipeDetailsService } from './get-recipe-details.service';

describe('GetRecipeDetailsService', () => {
  let service: GetRecipeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRecipeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
