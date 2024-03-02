import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellerEmployeeDialogComponent } from './create-seller-employee-dialog.component';

describe('CreateSellerEmployeeDialogComponent', () => {
  let component: CreateSellerEmployeeDialogComponent;
  let fixture: ComponentFixture<CreateSellerEmployeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSellerEmployeeDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSellerEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
