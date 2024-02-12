import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './component/seller.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [SellerComponent],
  imports: [CommonModule, SellerRoutingModule, RoutesContainerModule],
})
export class SellerModule {}
