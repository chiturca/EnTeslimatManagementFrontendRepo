import { TestBed } from '@angular/core/testing';

import { SellerBatchesService } from './seller-batches.service';

describe('SellerBatchesService', () => {
  let service: SellerBatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerBatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
