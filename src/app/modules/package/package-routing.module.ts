import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './component/package.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'package',
    component: PackageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
