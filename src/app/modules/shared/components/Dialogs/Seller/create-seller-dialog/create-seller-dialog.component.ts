import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { SellersService } from 'src/app/modules/seller/services/sellers.service';
import { CompanyTypes } from 'src/app/modules/seller/models/enums/company-types';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { CreateSellerRequestDto } from 'src/app/modules/seller/models/create-seller-request-dto';

@Component({
  selector: 'app-create-seller-dialog',
  templateUrl: './create-seller-dialog.component.html',
  styleUrls: ['./create-seller-dialog.component.css'],
})
export class CreateSellerDialogComponent implements OnInit {
  isLoading = true;
  createSellerForm!: FormGroup;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  sellerCompanyTypes = [
    { value: CompanyTypes.LimitedCompany, label: 'Limited Şirketi' },
    {
      value: CompanyTypes.SoleProprietorshipCompany,
      label: 'Şahıs Mülkiyeti Şirketi',
    },
    { value: CompanyTypes.IncorporatedCompany, label: 'Anonim Şirket' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private sellersService: SellersService,
    public dialogRef: MatDialogRef<CreateSellerDialogComponent>
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.initializeForm();
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoading = false;
    });
  }
  initializeForm(): void {
    this.createSellerForm = this.formBuilder.group({
      name: ['', Validators.required],
      taxId: ['', Validators.required],
      sellerCompanyType: [null, Validators.required],
    });
  }
  createSeller(): void {
    if (this.createSellerForm.invalid) {
      this.toastrService.error(
        'Form geçersiz. Lütfen gerekli tüm alanları doldurun.'
      );
      return;
    }
    const createSellerRequest: CreateSellerRequestDto = {
      name: this.createSellerForm.get('name')?.value,
      taxId: this.createSellerForm.get('taxId')?.value,
      sellerCompanyType: this.createSellerForm.get('sellerCompanyType')?.value,
      createdById: this.getUserFromAuthByDtoModel.userId,
    };
    this.sellersService.createSeller(createSellerRequest).subscribe({
      next: (response) => {
        this.toastrService.success(
          response.message || 'Satıcı başarıyla oluşturuldu.'
        );
        this.isLoading = false;
        this.dialogRef.close();
      },
      error: (error) => {
        this.toastrService.error(
          error.error.message || 'Satıcı oluşturulamadı. Lütfen tekrar deneyin.'
        );
        console.error(error);
        this.isLoading = false;
      },
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
