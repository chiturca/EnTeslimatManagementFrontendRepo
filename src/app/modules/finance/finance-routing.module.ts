import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceComponent } from './component/finance.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'finance',
    component: FinanceComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
