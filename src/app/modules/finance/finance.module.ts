import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './component/finance.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [FinanceComponent],
  imports: [CommonModule, FinanceRoutingModule, RoutesContainerModule],
})
export class FinanceModule {}
