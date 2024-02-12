import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './component/vehicle.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [VehicleComponent],
  imports: [CommonModule, VehicleRoutingModule, RoutesContainerModule],
})
export class VehicleModule {}
