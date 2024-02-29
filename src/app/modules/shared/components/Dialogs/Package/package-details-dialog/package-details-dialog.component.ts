import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeliveryTypeEnum } from 'src/app/modules/package/models/enums/delivery-type-enum';
import { ReceiverTypeEnum } from 'src/app/modules/package/models/enums/receiver-type-enum';
import { GetPackageDetailsForManagementResponseDto } from 'src/app/modules/package/models/get-package-details-for-management-response-dto';
import { PackageService } from 'src/app/modules/package/services/package.service';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-package-details-dialog',
  templateUrl: './package-details-dialog.component.html',
  styleUrls: ['./package-details-dialog.component.css'],
})
export class PackageDetailsDialogComponent implements OnInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  packageDetails: GetPackageDetailsForManagementResponseDto = {
    packageId: 0,
    deliveryType: DeliveryTypeEnum.Standart,
    warehouseAddressName: '',
    assignedCarrierFullName: '',
    receiverType: ReceiverTypeEnum.NotDetermined,
    receiverFullName: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private packageService: PackageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getPackageDetails();
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
    });
  }
  getPackageDetails(): void {
    this.packageService
      .getPackageDetailsForManagementByPackageId(this.data)
      .subscribe({
        next: (response) => {
          this.packageDetails = response.data;
          this.isLoaded = false;
        },
        error: (httpErrorResponse) => {
          this.toastrService.error(httpErrorResponse.error.message);
        },
      });
  }
  mapDeliveryTypeEnumToDisplayName(status: DeliveryTypeEnum): string {
    switch (status) {
      case DeliveryTypeEnum.Standart:
        return 'Standart';
      case DeliveryTypeEnum.Urgent:
        return 'Acil';
      case DeliveryTypeEnum.Heavy:
        return 'Ağır';
      default:
        return 'Bilinmeyen Durum';
    }
  }
  mapReceiverTypeEnumToDisplayName(status: ReceiverTypeEnum): string {
    switch (status) {
      case ReceiverTypeEnum.NotDetermined:
        return 'Belirlenmedi';
      case ReceiverTypeEnum.Itself:
        return 'Kendisi';
      case ReceiverTypeEnum.Neighbor:
        return 'Komşusu';
      case ReceiverTypeEnum.FirstDegreeRelative:
        return 'Birinci Derece Akrabası';
      default:
        return 'Bilinmeyen Durum';
    }
  }
}
