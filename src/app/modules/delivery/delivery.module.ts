import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './component/delivery.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [CommonModule, DeliveryRoutingModule, RoutesContainerModule],
})
export class DeliveryModule {}
