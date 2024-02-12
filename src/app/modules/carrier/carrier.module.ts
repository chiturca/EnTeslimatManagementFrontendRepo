import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrierRoutingModule } from './carrier-routing.module';
import { CarrierComponent } from './component/carrier.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [CarrierComponent],
  imports: [CommonModule, CarrierRoutingModule, RoutesContainerModule],
})
export class CarrierModule {}
