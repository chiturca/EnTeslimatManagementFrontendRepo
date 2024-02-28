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
    receiverType: ReceiverTypeEnum.Itself,
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
          this.packageDetails = response;
          this.isLoaded = false;
        },
        error: (httpErrorResponse) => {
          this.toastrService.error(httpErrorResponse.error.message);
        },
      });
  }
}
