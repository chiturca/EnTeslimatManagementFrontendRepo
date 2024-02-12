import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


@NgModule({
  declarations: [
    WarehousesComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule
  ],
  exports:[
    WarehousesComponent
  ],
  providers:[
    AuthGuard
  ]
})
export class WarehouseModule { }
