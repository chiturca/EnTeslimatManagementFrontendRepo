import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { SellerAddressesService } from 'src/app/modules/shared/services/seller-addresses.service';
import { GetAllSellerAddressesResponseDto } from 'src/app/modules/shared/models/get-all-seller-addresses-response-dto';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';

@Component({
  selector: 'app-seller-addresses-dialog',
  templateUrl: './seller-addresses-dialog.component.html',
  styleUrls: ['./seller-addresses-dialog.component.css'],
})
export class SellerAddressesDialogComponent implements OnInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  getAllSellerAddresses!: GetAllSellerAddressesResponseDto[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sellerAddressService: SellerAddressesService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getAllSellerAddressesBySellerId();
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
    });
  }
  getAllSellerAddressesBySellerId(): void {
    this.sellerAddressService
      .getAllSellerAddressesBySellerId(this.data.seller.id)
      .subscribe({
        next: (response) => {
          this.getAllSellerAddresses = response.data;
          this.isLoaded = response.success;
        },
        error: (httpErrorResponse) => {
          this.toastrService.error(httpErrorResponse.error.message);
        },
      });
  }
}
