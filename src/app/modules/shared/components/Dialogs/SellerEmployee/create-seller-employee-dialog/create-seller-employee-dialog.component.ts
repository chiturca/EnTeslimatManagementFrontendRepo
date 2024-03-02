import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { SellerEmployeesService } from 'src/app/modules/seller-employee/services/seller-employees.service';
import { SellersService } from 'src/app/modules/seller/services/sellers.service';
import { SellerAddressesService } from 'src/app/modules/shared/services/seller-addresses.service';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { CreateSellerEmployeeDto } from 'src/app/modules/seller-employee/models/create-seller-employee-dto';
import { SellerEmployeeTitleEnum } from 'src/app/modules/seller-employee/models/enums/seller-employee-title-enum';
import { GetAllSellerResponseDto } from 'src/app/modules/seller/models/get-all-seller-response-dto';
import { GetAllSellerAddressesResponseDto } from 'src/app/modules/shared/models/get-all-seller-addresses-response-dto';

@Component({
  selector: 'app-create-seller-employee-dialog',
  templateUrl: './create-seller-employee-dialog.component.html',
  styleUrls: ['./create-seller-employee-dialog.component.css'],
})
export class CreateSellerEmployeeDialogComponent implements OnInit {
  isLoading = true;
  createSellerEmployeeForm!: FormGroup;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  sellerEmployeeTitles = [
    { value: SellerEmployeeTitleEnum.Regular, label: 'Çalışan' },
    { value: SellerEmployeeTitleEnum.Moderator, label: 'Moderatör' },
    { value: SellerEmployeeTitleEnum.Owner, label: 'Şirket Sahibi' },
  ];
  sellers: GetAllSellerResponseDto[] = [];
  sellerAddresses: GetAllSellerAddressesResponseDto[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private sellerEmployeesService: SellerEmployeesService,
    private sellersService: SellersService,
    private sellerAddressesService: SellerAddressesService,
    public dialogRef: MatDialogRef<CreateSellerEmployeeDialogComponent>
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.initializeForm();
    this.fetchSellers();
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoading = false;
    });
  }
  initializeForm(): void {
    this.createSellerEmployeeForm = this.formBuilder.group({
      identityNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      sellerEmployeeTitle: ['', Validators.required],
      sellerId: ['', Validators.required],
      sellerAddressId: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.createSellerEmployeeForm.valid) {
      const createSellerEmployeeRequest: CreateSellerEmployeeDto = {
        identityNumber:
          this.createSellerEmployeeForm.get('identityNumber')?.value,
        email: this.createSellerEmployeeForm.get('email')?.value,
        firstName: this.createSellerEmployeeForm.get('firstName')?.value,
        middleName: this.createSellerEmployeeForm.get('middleName')?.value,
        lastName: this.createSellerEmployeeForm.get('lastName')?.value,
        phone: this.createSellerEmployeeForm.get('phone')?.value,
        sellerEmployeeTitle: this.createSellerEmployeeForm.get(
          'sellerEmployeeTitle'
        )?.value,
        sellerId: this.createSellerEmployeeForm.get('sellerId')?.value,
        sellerAddressId:
          this.createSellerEmployeeForm.get('sellerAddressId')?.value,
        createdById: this.getUserFromAuthByDtoModel.userId,
      };
      this.sellerEmployeesService
        .createSellerEmployee(createSellerEmployeeRequest)
        .subscribe({
          next: (response) => {
            this.toastrService.success(
              response.message || 'Satıcı çalışanı başarıyla oluşturuldu.'
            );
            this.dialogRef.close();
          },
          error: (error) => {
            this.toastrService.error(
              error.error.message ||
                'Satıcı çalışanı oluşturulurken bir hata oluşturuldu.'
            );
          },
        });
    } else {
      this.toastrService.error('Lütfen gerekli tüm alanları doldurun.');
    }
  }
  fetchSellers(): void {
    this.sellersService.getActiveSellers().subscribe({
      next: (response) => {
        this.sellers = response.data;
      },
      error: (error) => {
        this.toastrService.error(
          error.message || 'Satıcılar yüklenirken bir hata oluştu.'
        );
      },
    });
  }
  onSellerChange(): void {
    const sellerId = this.createSellerEmployeeForm.get('sellerId')?.value;
    if (sellerId) {
      this.sellerAddressesService
        .getAllSellerAddressesBySellerId(sellerId)
        .pipe(
          catchError((error) => {
            this.toastrService.error(
              error.message || 'Satıcı adresleri yüklenirken bir hata oluştu.'
            );
            return throwError(error);
          })
        )
        .subscribe({
          next: (response) => {
            this.sellerAddresses = response.data;
          },
        });
    }
  }
}
