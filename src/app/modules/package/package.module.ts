import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './component/package.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [CommonModule, PackageRoutingModule, RoutesContainerModule],
})
export class PackageModule {}
