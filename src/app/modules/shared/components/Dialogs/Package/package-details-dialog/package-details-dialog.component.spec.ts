import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDetailsDialogComponent } from './package-details-dialog.component';

describe('PackageDetailsDialogComponent', () => {
  let component: PackageDetailsDialogComponent;
  let fixture: ComponentFixture<PackageDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(PackageDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
