import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../user/services/user.service';
import { CustomerService } from '../services/customer.service';
import { GetAllCustomersForManagementResponseDto } from '../models/response/get-all-customers-for-management-response-dto';
import { ConfirmationDialogComponent } from '../../shared/components/Dialogs/confirmation-dialog/confirmation-dialog.component';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  allCustomers: GetAllCustomersForManagementResponseDto[] = [];
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  isLoaded: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.getAllCustomersForManagement();
    console.log();
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAllCustomersForManagement();
    });
  }
  getAllCustomersForManagement(): void {
    this.customerService.getAllCustomersForManagement().subscribe({
      next: (response) => {
        this.allCustomers = response.data;
        this.isLoaded = response.success;
        console.log(response);
      },
      error: (httpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.message);
      },
    });
  }
  deleteCustomer(customerId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu müşteriyi silmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService
          .deleteCustomerLocallyById(
            customerId,
            this.getUserFromAuthByDtoModel.userId
          )
          .subscribe({
            next: (response) => {
              this.toastrService.success(
                response.message || 'Müşteri başarıyla silindi'
              );
              this.getAllCustomersForManagement();
            },
            error: (httpErrorResponse) => {
              this.toastrService.error(httpErrorResponse.error.message);
            },
          });
      }
    });
  }
  activateCustomer(customerId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '',
      data: {
        title: 'Emin Misiniz?',
        content: 'Bu müşteriyi aktifleştirmek istediğinizden emin misiniz?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService
          .activateCustomerByCustomerId(customerId)
          .subscribe({
            next: (response) => {
              this.toastrService.success(
                response.message || 'Müşteri başarıyla aktifleştirildi'
              );
              this.getAllCustomersForManagement();
            },
            error: (httpErrorResponse) => {
              this.toastrService.error(httpErrorResponse.error.message);
            },
          });
      }
    });
  }
}
