import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerBatchRoutingModule } from './seller-batch-routing.module';
import { SellerBatchComponent } from './component/seller-batch.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [SellerBatchComponent],
  imports: [CommonModule, SellerBatchRoutingModule, RoutesContainerModule],
})
export class SellerBatchModule {}
