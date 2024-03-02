import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarrierModule } from './modules/carrier/carrier.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { PackageModule } from './modules/package/package.module';
import { SellerModule } from './modules/seller/seller.module';
import { SellerBatchModule } from './modules/seller-batch/seller-batch.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { WarehouseRegionModule } from './modules/warehouse-region/warehouse-region.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FinanceModule } from './modules/finance/finance.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SellerEmployeeModule } from './modules/seller-employee/seller-employee.module';
registerLocaleData(localeTr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    CarrierModule,
    DeliveryModule,
    PackageModule,
    SellerModule,
    SellerBatchModule,
    SellerEmployeeModule,
    UserModule,
    DashboardModule,
    VehicleModule,
    WarehouseModule,
    WarehouseRegionModule,
    FinanceModule,
    CustomerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    CookieService,
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'tr-TR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
