import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousesComponent } from './warehouses.component';

describe('WarehousesComponent', () => {
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehousesComponent]
    });
    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
