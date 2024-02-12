import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBatchComponent } from './seller-batch.component';

describe('SellerBatchComponent', () => {
  let component: SellerBatchComponent;
  let fixture: ComponentFixture<SellerBatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerBatchComponent],
    });
    fixture = TestBed.createComponent(SellerBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
