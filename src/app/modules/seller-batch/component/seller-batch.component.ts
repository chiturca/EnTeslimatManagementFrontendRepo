import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { SellerBatchesService } from '../services/seller-batches.service';
import { CityService } from '../../shared/city/services/city.service';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { GetAllSellerBatchesForManagementResponseDto } from '../models/get-all-seller-batches-for-management-response-dto';
import { City } from '../../shared/city/models/city';
import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerBatchStatusEnum } from '../models/enums/seller-batch-status-enum';

@Component({
  selector: 'app-seller-batch',
  templateUrl: './seller-batch.component.html',
  styleUrls: ['./seller-batch.component.css'],
})
export class SellerBatchComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  searchInputControl: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<GetAllSellerBatchesForManagementResponseDto>;
  cities: City[] = [];
  selectedCityName: string = '';
  selectedCityId: number = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private userService: UserService,
    private sellerBatchesService: SellerBatchesService,
    private cityService: CityService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.dataSource =
      new MatTableDataSource<GetAllSellerBatchesForManagementResponseDto>();
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.getAllSellerBatchesForManagement();
    this.getAllCities();
    this.setupFilter();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges();
  }
  setupFilter(): void {
    this.searchInputControl.valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        map((value) => (typeof value === 'string' ? value : ''))
      )
      .subscribe((value) => {
        this.applyFilter(value);
      });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  getAllCities() {
    this.cityService.getAllCities().subscribe({
      next: (response) => {
        this.cities = response.data;
      },
      error: (error) =>
        this.toastrService.error('Şehirler yüklenirken bir hata oluştu.'),
    });
  }
  getCityNameById(cityId: number): string {
    const city = this.cities.find((c) => c.id === cityId);
    return city ? city.cityName : '';
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAllSellerBatchesForManagement();
    });
  }
  getAllSellerBatchesForManagement(): void {
    this.sellerBatchesService.getAllSellerBatchesForManagement().subscribe({
      next: (response) => {
        this.dataSource.data = response.data.reverse();
        this.isLoaded = response.success;
        this.changeDetectorRef.detectChanges();
      },
      error: (httpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.message);
      },
    });
  }
  getBatchStatusLabel(batchStatus: SellerBatchStatusEnum): string {
    switch (batchStatus) {
      case SellerBatchStatusEnum.Created:
        return 'Oluşturuldu';
      case SellerBatchStatusEnum.ApprovedBySeller:
        return 'Onaylandı';
      case SellerBatchStatusEnum.AssignedToCarrier:
        return 'Taşıyıcıya atandı';
      case SellerBatchStatusEnum.ReceivedByWareHouse:
        return 'Depo tarafından alındı';
      case SellerBatchStatusEnum.ResolvedByWareWarehouse:
        return 'Depo tarafından çözüldü';
      default:
        return 'Bilinmeyen Durum';
    }
  }
  getBatchStatusBg(batchStatus: SellerBatchStatusEnum): string {
    switch (batchStatus) {
      case 0:
        return '#fed7aa';
      case 1:
        return '#fde68a';
      case 2:
        return '#fde047';
      case 3:
        return '#d9f99d';
      case 4:
        return '#86efac';
      default:
        return '#9ca3af';
    }
  }
  getBatchStatusColor(batchStatus: SellerBatchStatusEnum): string {
    switch (batchStatus) {
      case 0:
        return '#7c2d12';
      case 1:
        return '#92400e';
      case 2:
        return '#854d0e';
      case 3:
        return '#3f6212';
      case 4:
        return '#166534';
      default:
        return '#4b5563';
    }
  }
  mapEntityStatus(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'Aktif Batch';
      case EntityStatuses.inactive:
        return 'Pasif Batch';
      default:
        return 'Bilinmeyen Paket Tipi';
    }
  }
  getColor(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgb(34 197 94)';
      case EntityStatuses.inactive:
        return 'red';
      default:
        return 'Bilinmeyen Batch Tipi';
    }
  }
  getBg(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgba(34, 197, 94, 0.2)';
      case EntityStatuses.inactive:
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'Bilinmeyen Batch Tipi';
    }
  }
}
