import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesDialogComponent } from './customer-addresses-dialog.component';

describe('CustomerAddressesDialogComponent', () => {
  let component: CustomerAddressesDialogComponent;
  let fixture: ComponentFixture<CustomerAddressesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddressesDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerAddressesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
