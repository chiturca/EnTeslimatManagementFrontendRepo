import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddressesDialogComponent } from './seller-addresses-dialog.component';

describe('SellerAddressesDialogComponent', () => {
  let component: SellerAddressesDialogComponent;
  let fixture: ComponentFixture<SellerAddressesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerAddressesDialogComponent]
    });
    fixture = TestBed.createComponent(SellerAddressesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
