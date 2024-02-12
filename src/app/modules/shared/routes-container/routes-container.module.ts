import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesContainerComponent } from './routes-container.component';
import { SharedModule } from '../shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedRoutingModule } from '../shared-routing.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [RoutesContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [RoutesContainerComponent],
})
export class RoutesContainerModule {}
