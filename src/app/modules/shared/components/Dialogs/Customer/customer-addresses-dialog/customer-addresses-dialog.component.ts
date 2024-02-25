import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { DeliveryAddressService } from 'src/app/modules/shared/services/delivery-address.service';

@Component({
  selector: 'app-customer-addresses-dialog',
  templateUrl: './customer-addresses-dialog.component.html',
  styleUrls: ['./customer-addresses-dialog.component.css'],
})
export class CustomerAddressesDialogComponent implements OnInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private userService: UserService,
    private deliveryAddressService: DeliveryAddressService
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    console.log(this.data);
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      console.log('uer response:', response);
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
    });
  }
  deleteAddress(deliveryAddressId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu adresi silmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deliveryAddressService
          .deleteDeliveryAddressFromManagement(
            deliveryAddressId,
            this.getUserFromAuthByDtoModel.userId
          )
          .subscribe({
            next: (response) => {
              this.toastrService.success(
                response.message || 'Adres başarıyla silindi'
              );
            },
            error: (httpErrorResponse) => {
              this.toastrService.error(httpErrorResponse.error.message);
            },
          });
      }
    });
  }
}
