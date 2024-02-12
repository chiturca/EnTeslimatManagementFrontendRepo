import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'warehouse',
    component: WarehousesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
