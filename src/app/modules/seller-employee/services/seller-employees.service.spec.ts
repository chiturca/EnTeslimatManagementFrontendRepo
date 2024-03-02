import { TestBed } from '@angular/core/testing';

import { SellerEmployeesService } from './seller-employees.service';

describe('SellerEmployeesService', () => {
  let service: SellerEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
