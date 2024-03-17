import { TestBed } from '@angular/core/testing';

import { BarcodeFetchService } from './barcode-fetch.service';

describe('BarcodeFetchService', () => {
  let service: BarcodeFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcodeFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
