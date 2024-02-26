import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SharedRoutingModule } from './shared-routing.module';
import { ResponsiveToolbarComponent } from './components/responsive-toolbar/responsive-toolbar.component';
import { ResponsiveSidenavComponent } from './components/responsive-sidenav/responsive-sidenav.component';
import { ConfirmationDialogComponent } from './components/Dialogs/confirmation-dialog/confirmation-dialog.component';
import { CustomerAddressesDialogComponent } from './components/Dialogs/Customer/customer-addresses-dialog/customer-addresses-dialog.component';
import { AddAddressDialogComponent } from './components/Dialogs/Customer/add-address-dialog/add-address-dialog.component';
import { UpdateAddressDialogComponent } from './components/Dialogs/Customer/update-address-dialog/update-address-dialog.component';
import { SellerAddressesDialogComponent } from './components/Dialogs/Seller/seller-addresses-dialog/seller-addresses-dialog.component';
import { AddSellerAddressComponent } from './components/Dialogs/Seller/add-seller-address/add-seller-address.component';
import { UpdateSellerAddressComponent } from './components/Dialogs/Seller/update-seller-address/update-seller-address.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ResponsiveToolbarComponent,
    ResponsiveSidenavComponent,
    ConfirmationDialogComponent,
    CustomerAddressesDialogComponent,
    AddAddressDialogComponent,
    UpdateAddressDialogComponent,
    SellerAddressesDialogComponent,
    AddSellerAddressComponent,
    UpdateSellerAddressComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
  ],
  exports: [
    ResponsiveToolbarComponent,
    ResponsiveSidenavComponent,
    ConfirmationDialogComponent,
    CustomerAddressesDialogComponent,
    AddAddressDialogComponent,
    UpdateAddressDialogComponent,
    SellerAddressesDialogComponent,
    AddSellerAddressComponent,
    UpdateSellerAddressComponent,
  ],
})
export class SharedModule {}
