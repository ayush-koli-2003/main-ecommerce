import { TestBed } from '@angular/core/testing';

import { ProductHandlerService } from './product-handler.service';

describe('ProductHandlerService', () => {
  let service: ProductHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
