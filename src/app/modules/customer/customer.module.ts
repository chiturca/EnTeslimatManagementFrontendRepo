import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './component/customer.component';
import { RoutesContainerModule } from '../shared/routes-container/routes-container.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RoutesContainerModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class CustomerModule {}
