import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './component/vehicle.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'vehicle',
    component: VehicleComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRoutingModule {}
