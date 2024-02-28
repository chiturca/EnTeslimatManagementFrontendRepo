import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './component/package.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    RoutesContainerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
})
export class PackageModule {}
