import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BarcodeFetchService } from './barcode-fetch.service';

describe('BarcodeFetchService', () => {
  let service: BarcodeFetchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BarcodeFetchService]
    });
    service = TestBed.inject(BarcodeFetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProductInfo', () => {
    it('should return product info for the given ID', () => {
      const testId = 123456789;
      const mockResponse = { product: { id: testId, name: 'Test Product' } };

      service.getProductInfo(testId).subscribe(info => {
        expect(info).toBeTruthy();
        expect(info.product).toBeDefined();
        expect(info.product.id).toBe(testId);
      });

      const req = httpMock.expectOne(`https://world.openfoodfacts.org/api/v0/product/${testId}.json`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  // Additional tests to cover different scenarios, such as invalid IDs or server errors, can be added here.
});