import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierComponent } from './carrier.component';

describe('CarrierComponent', () => {
  let component: CarrierComponent;
  let fixture: ComponentFixture<CarrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrierComponent],
    });
    fixture = TestBed.createComponent(CarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
