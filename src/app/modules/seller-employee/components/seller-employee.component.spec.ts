import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEmployeeComponent } from './seller-employee.component';

describe('SellerEmployeeComponent', () => {
  let component: SellerEmployeeComponent;
  let fixture: ComponentFixture<SellerEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerEmployeeComponent],
    });
    fixture = TestBed.createComponent(SellerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
