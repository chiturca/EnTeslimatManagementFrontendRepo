import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { City } from 'src/app/modules/shared/city/models/city';
import { CityService } from 'src/app/modules/shared/city/services/city.service';
import { District } from 'src/app/modules/shared/district/models/district';
import { DistrictService } from 'src/app/modules/shared/district/services/district.service';
import { UpdateSellerAddressRequestDto } from 'src/app/modules/shared/models/update-seller-address-request-dto';
import { Neighbourhood } from 'src/app/modules/shared/neighbourhood/models/neighbourhood';
import { NeighbourhoodService } from 'src/app/modules/shared/neighbourhood/services/neighbourhood.service';
import { SellerAddressesService } from 'src/app/modules/shared/services/seller-addresses.service';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UpdateAddressDialogComponent } from '../../Customer/update-address-dialog/update-address-dialog.component';

@Component({
  selector: 'app-update-seller-address',
  templateUrl: './update-seller-address.component.html',
  styleUrls: ['./update-seller-address.component.css'],
})
export class UpdateSellerAddressComponent implements OnInit {
  isLoading = true;
  updateForm!: FormGroup;
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
    public dialogRef: MatDialogRef<UpdateAddressDialogComponent>
  ) {
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.initializeForm();
    console.log(this.data);
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoading = false;
    });
  }
  initializeForm(): void {
    this.updateForm = this.formBuilder.group({
      city: ['', Validators.required],
      district: ['', Validators.required],
      neighbourhood: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.getAllCities();
  }
  onSubmit(): void {
    if (this.updateForm.valid) {
      const updateRequest: UpdateSellerAddressRequestDto = {
        newAddress: this.updateForm.get('address')?.value,
        newCityKey: this.updateForm.get('city')?.value,
        newDistrictKey: this.updateForm.get('district')?.value,
        newNeighbourhoodKey: this.updateForm.get('neighbourhood')?.value,
      };
      this.sellerAddressService
        .updateSellerAddressById(updateRequest, this.data.id)
        .pipe(
          catchError((err) => {
            this.toastrService.error(err.error.message);
            return throwError(err);
          })
        )
        .subscribe({
          next: () => {
            this.toastrService.success('Adres başarıyla güncellendi.');
            this.dialogRef.close();
          },
          error: (error) => {
            this.toastrService.error(
              error.error.message ||
                'Adres güncelleme sırasında bir hata oluştu'
            );
            console.error(error);
          },
        });
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
    this.updateForm.patchValue({
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
    this.updateForm.patchValue({
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
    this.updateForm.patchValue({
      newCustomerDeliveryAddressDto: {
        neighbourhoodName: this.selectedNeighbourhood.neighbourhoodName,
      },
      neighbourhood: this.selectedNeighbourhood.neighbourhoodKey,
    });
  }
}
