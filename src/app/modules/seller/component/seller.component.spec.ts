import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerComponent],
    });
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
