import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/user/services/user.service';
import { City } from 'src/app/modules/shared/city/models/city';
import { CityService } from 'src/app/modules/shared/city/services/city.service';
import { District } from 'src/app/modules/shared/district/models/district';
import { DistrictService } from 'src/app/modules/shared/district/services/district.service';
import { Neighbourhood } from 'src/app/modules/shared/neighbourhood/models/neighbourhood';
import { NeighbourhoodService } from 'src/app/modules/shared/neighbourhood/services/neighbourhood.service';
import { SellerAddressesService } from 'src/app/modules/shared/services/seller-addresses.service';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { AddSellerAddressToSellerRequestDto } from 'src/app/modules/shared/models/add-seller-address-to-seller-request-dto';

@Component({
  selector: 'app-add-seller-address',
  templateUrl: './add-seller-address.component.html',
  styleUrls: ['./add-seller-address.component.css'],
})
export class AddSellerAddressComponent implements OnInit {
  isLoading = true;
  addAddressForm!: FormGroup;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  cities: City[] = [];
  districts: District[] = [];
  neighbourhoods: Neighbourhood[] = [];
  selectedCity: City = {
    id: 0,
    cityKey: 0,
    cityName: '',
  };
  selectedDistrict: District = {
    id: 0,
    districtCityKey: 0,
    districtName: '',
    districtKey: 0,
  };
  selectedNeighbourhood: Neighbourhood = {
    id: 0,
    neighbourhoodDistrictKey: 0,
    neighbourhoodKey: 0,
    neighbourhoodName: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private sellerAddressService: SellerAddressesService,
    private cityService: CityService,
    private districtService: DistrictService,
    private neighbourhoodService: NeighbourhoodService,
    public dialogRef: MatDialogRef<AddSellerAddressComponent>
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.initializeForm();
    // console.log(this.data);
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoading = false;
    });
  }
  initializeForm(): void {
    this.addAddressForm = this.formBuilder.group({
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighbourhood: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.getAllCities();
  }
  onSubmit(): void {
    if (this.addAddressForm.valid) {
      const addAddressRequest: AddSellerAddressToSellerRequestDto = {
        cityKey: this.addAddressForm.get('city')?.value,
        districtKey: this.addAddressForm.get('district')?.value,
        neighbourhoodKey: this.addAddressForm.get('neighbourhood')?.value,
        address: this.addAddressForm.get('address')?.value,
        sellerId: this.data.seller.id,
        createdById: this.getUserFromAuthByDtoModel.userId,
      };
      this.sellerAddressService
        .addSellerAddressToSeller(addAddressRequest)
        .subscribe({
          next: (response) => {
            this.toastrService.success(
              response.message || 'Adres başarıyla eklendi.'
            );
            this.dialogRef.close();
          },
          error: (error) => {
            this.toastrService.error('Adres eklenirken bir hata oluştu.');
          },
        });
    } else {
      this.toastrService.error('Lütfen geçerli bir adres giriniz.');
    }
  }
  getAllCities() {
    this.cityService.getAllCities().subscribe({
      next: (response) => (this.cities = response.data),
      error: (error) =>
        this.toastrService.error(
          error.message || 'Şehirler yüklenirken bir hata oluştu.'
        ),
    });
  }
  onCityChange(event: any) {
    const cityKey: number = event.value;
    this.cities.find((city) => city.cityKey === cityKey);
    this.selectedCity.cityKey = cityKey;
    this.addAddressForm.patchValue({
      newCustomerDeliveryAddressDto: {
        cityName: this.selectedCity.cityName,
      },
      city: cityKey,
    });
    this.districtService.getAllDistrictsByCityKey(cityKey).subscribe({
      next: (response) => (this.districts = response.data),
      error: (error) =>
        this.toastrService.error(
          error.message || 'İlçeler yüklenirken bir hata oluştu.'
        ),
    });
  }
  onDistrictChange(event: any) {
    const districtKey: number = event.value;
    this.districts.find((d) => d.districtKey === event.value);
    this.selectedDistrict.districtKey = event.value;
    this.addAddressForm.patchValue({
      newCustomerDeliveryAddressDto: {
        districtName: this.selectedDistrict.districtName,
      },
      district: this.selectedDistrict.districtKey,
    });
    this.neighbourhoodService
      .getAllNeighbourhoodsByDistrictKey(districtKey)
      .subscribe({
        next: (response) => (this.neighbourhoods = response.data),
        error: (error) =>
          this.toastrService.error(
            error.message || 'Mahalleler yüklenirken bir hata oluştu.'
          ),
      });
  }
  onNeighbourhoodChange(event: any) {
    this.neighbourhoods.find((n) => n.neighbourhoodKey === event.value);
    this.selectedNeighbourhood.neighbourhoodKey = event.value;
    this.addAddressForm.patchValue({
      newCustomerDeliveryAddressDto: {
        neighbourhoodName: this.selectedNeighbourhood.neighbourhoodName,
      },
      neighbourhood: this.selectedNeighbourhood.neighbourhoodKey,
    });
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
