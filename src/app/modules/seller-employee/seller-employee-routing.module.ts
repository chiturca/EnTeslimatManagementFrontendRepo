import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerEmployeeComponent } from './components/seller-employee.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'seller-employee',
    component: SellerEmployeeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerEmployeeRoutingModule {}
