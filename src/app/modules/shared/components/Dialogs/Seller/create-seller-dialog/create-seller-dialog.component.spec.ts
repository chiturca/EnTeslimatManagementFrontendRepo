import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSellerDialogComponent } from './create-seller-dialog.component';

describe('CreateSellerDialogComponent', () => {
  let component: CreateSellerDialogComponent;
  let fixture: ComponentFixture<CreateSellerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSellerDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
