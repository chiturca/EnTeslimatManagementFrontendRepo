import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { PackageService } from '../services/package.service';
import { GetAllPackagesForManagementResponseDto } from '../models/get-all-packages-for-management-response-dto';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { DeliveryStatusEnum } from '../models/enums/delivery-status-enum';
import { PackageDetailsDialogComponent } from '../../shared/components/Dialogs/Package/package-details-dialog/package-details-dialog.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  searchInputControl: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<GetAllPackagesForManagementResponseDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private packageService: PackageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.dataSource =
      new MatTableDataSource<GetAllPackagesForManagementResponseDto>();
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getAllPackagesForManagement();
    this.setupFilter();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        if (sort.active === 'customerName' && sort.direction) {
          this.dataSource.data = this.dataSource.data.sort(
            (a, b) =>
              this.compareTurkishAlphabet(a.customerName, b.customerName) *
              (sort.direction === 'asc' ? 1 : -1)
          );
        }
      });
    }
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
  compareTurkishAlphabet(a: string, b: string): number {
    const valueA = a?.toLowerCase();
    const valueB = b?.toLowerCase();

    const alphabet = 'abcçdefgğhıijklmnoöprsştuüvyz';
    const indexA = alphabet.indexOf(valueA);
    const indexB = alphabet.indexOf(valueB);

    if (indexA === -1 || indexB === -1) {
      return valueA.localeCompare(valueB);
    }

    return indexA - indexB;
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAllPackagesForManagement();
    });
  }
  getAllPackagesForManagement(): void {
    this.packageService.getAllPackagesForManagement().subscribe({
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
  openPackageDetails(packageId: number) {
    const dialogRef = this.dialog.open(PackageDetailsDialogComponent, {
      maxWidth: '50em',
      data: packageId,
    });
  }
  mapDeliveryStatusEnumToDisplayName(status: DeliveryStatusEnum): string {
    switch (status) {
      case DeliveryStatusEnum.ReadyToCollection:
        return 'Toplanmaya Hazır';
      case DeliveryStatusEnum.InWareHouse:
        return 'Depoda';
      case DeliveryStatusEnum.AssignedToCarrier:
        return 'Kuryeye Atandı';
      case DeliveryStatusEnum.InDistribution:
        return 'Dağıtımda';
      case DeliveryStatusEnum.DeliveredToCustomer:
        return 'Müşteriye Teslim Edildi';
      case DeliveryStatusEnum.Cancelled:
        return 'İptal Edildi';
      default:
        return 'Bilinmeyen Durum';
    }
  }
  getDeliveryStatusEnumBg(status: DeliveryStatusEnum): string {
    switch (status) {
      case DeliveryStatusEnum.ReadyToCollection:
        return '#fccb08';
      case DeliveryStatusEnum.InWareHouse:
        return '#fde047';
      case DeliveryStatusEnum.AssignedToCarrier:
        return '#d9f99d';
      case DeliveryStatusEnum.InDistribution:
        return '#b4ffd0';
      case DeliveryStatusEnum.DeliveredToCustomer:
        return '#86efac';
      case DeliveryStatusEnum.Cancelled:
        return '#cbd5e1';
      default:
        return '#f3f4f6';
    }
  }
  getDeliveryStatusEnumColor(status: DeliveryStatusEnum): string {
    switch (status) {
      case DeliveryStatusEnum.ReadyToCollection:
        return '#ffffff';
      case DeliveryStatusEnum.InWareHouse:
        return '#854d0e';
      case DeliveryStatusEnum.AssignedToCarrier:
        return '#3f6212';
      case DeliveryStatusEnum.InDistribution:
        return '#166534';
      case DeliveryStatusEnum.DeliveredToCustomer:
        return '#14532d';
      case DeliveryStatusEnum.Cancelled:
        return '#1e293b';
      default:
        return '#4b5563';
    }
  }
  mapEntityStatus(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'Aktif Paket';
      case EntityStatuses.inactive:
        return 'Silinmiş Paket';
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
        return 'Bilinmeyen Paket Tipi';
    }
  }
  getBg(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgba(34, 197, 94, 0.2)';
      case EntityStatuses.inactive:
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'Bilinmeyen Paket Tipi';
    }
  }
}
