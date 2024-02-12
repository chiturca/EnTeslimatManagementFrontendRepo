import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrierComponent } from './component/carrier.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'carrier',
    component: CarrierComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarrierRoutingModule {}
