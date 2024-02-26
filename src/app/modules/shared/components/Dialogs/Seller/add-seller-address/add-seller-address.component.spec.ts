import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSellerAddressComponent } from './add-seller-address.component';

describe('AddSellerAddressComponent', () => {
  let component: AddSellerAddressComponent;
  let fixture: ComponentFixture<AddSellerAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSellerAddressComponent]
    });
    fixture = TestBed.createComponent(AddSellerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
