import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { SellerAddressesService } from 'src/app/modules/shared/services/seller-addresses.service';
import { GetAllSellerAddressesResponseDto } from 'src/app/modules/shared/models/get-all-seller-addresses-response-dto';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AddSellerAddressComponent } from '../add-seller-address/add-seller-address.component';
import { UpdateSellerAddressRequestDto } from 'src/app/modules/shared/models/update-seller-address-request-dto';
import { UpdateSellerAddressComponent } from '../update-seller-address/update-seller-address.component';
import { DeliveryAddressDtoVersion2 } from 'src/app/modules/customer/models/response/delivery-address-dto-version2';

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
  activateSellerAddressById(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '50em',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu adresi aktifleştirmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerAddressService.activateSellerAddressById(id).subscribe({
          next: (response) => {
            this.toastrService.success(
              response.message || 'Adres başarıyla aktifleştirildi'
            );
          },
          error: (httpErrorResponse) => {
            this.toastrService.error(httpErrorResponse.error.message);
          },
        });
      }
    });
  }
  deactivateSellerAddressById(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '50em',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu adresi silmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sellerAddressService.deactivateSellerAddressById(id).subscribe({
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
  addSellerAddressToSeller(): void {
    const dialogRef = this.dialog.open(AddSellerAddressComponent, {
      maxWidth: '50em',
      data: this.data,
    });
  }
  updateSellerAddressById(address: DeliveryAddressDtoVersion2): void {
    const dialogRef = this.dialog.open(UpdateSellerAddressComponent, {
      data: address,
      maxWidth: '50em',
    });
    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress) {
        const index = this.data.customer.deliveryAddresses.indexOf(address);
        if (index !== -1) {
          const updateRequest: UpdateSellerAddressRequestDto = {
            newAddress: newAddress.address,
            newCityKey: newAddress.newCityKey,
            newDistrictKey: newAddress.newDistrictKey,
            newNeighbourhoodKey: newAddress.newNeighbourhoodKey,
          };
          this.sellerAddressService
            .updateSellerAddressById(updateRequest, this.data.id)
            .subscribe((response) => {
              if (response.success) {
                this.getAllSellerAddresses[index] = newAddress;
                this.toastrService.success('Adres başarıyla güncellendi.');
              } else {
                this.toastrService.error(response.message) ||
                  'Adres güncellenirken bir hata oluştu.';
              }
            });
        }
      }
    });
  }
}
