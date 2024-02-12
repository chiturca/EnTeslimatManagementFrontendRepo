import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerBatchComponent } from './component/seller-batch.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'seller-batch',
    component: SellerBatchComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerBatchRoutingModule {}
