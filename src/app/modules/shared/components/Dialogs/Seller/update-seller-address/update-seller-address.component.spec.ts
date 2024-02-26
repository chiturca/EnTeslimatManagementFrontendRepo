import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSellerAddressComponent } from './update-seller-address.component';

describe('UpdateSellerAddressComponent', () => {
  let component: UpdateSellerAddressComponent;
  let fixture: ComponentFixture<UpdateSellerAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSellerAddressComponent]
    });
    fixture = TestBed.createComponent(UpdateSellerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
