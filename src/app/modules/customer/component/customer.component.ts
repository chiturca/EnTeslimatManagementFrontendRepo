import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { CustomerService } from '../services/customer.service';
import { GetAllCustomersForManagementResponseDto } from '../models/response/get-all-customers-for-management-response-dto';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { EntityStatuses } from '../models/enums/entity-statuses';
import { ConfirmationDialogComponent } from '../../shared/components/Dialogs/confirmation-dialog/confirmation-dialog.component';
import { CustomerAddressesDialogComponent } from '../../shared/components/Dialogs/Customer/customer-addresses-dialog/customer-addresses-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  searchInputControl: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<GetAllCustomersForManagementResponseDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog
  ) {
    this.dataSource =
      new MatTableDataSource<GetAllCustomersForManagementResponseDto>();
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    // this.getUserFromAuthByDto();
    this.getAllCustomersForManagement();
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
      // If character is not found in the Turkish alphabet, use default comparison
      return valueA.localeCompare(valueB);
    }

    return indexA - indexB;
  }
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      // console.log('Cust User Response:', response);
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAllCustomersForManagement();
    });
  }
  getAllCustomersForManagement(): void {
    this.customerService.getAllCustomersForManagement().subscribe({
      next: (response) => {
        // console.log(response);
        this.dataSource.data = response.data.reverse();
        this.isLoaded = response.success;
        this.changeDetectorRef.detectChanges();
      },
      error: (httpErrorResponse) => {
        this.toastrService.error(httpErrorResponse.error.message);
      },
    });
  }
  openCustomerAddressesDialog(
    customer: GetAllCustomersForManagementResponseDto
  ): void {
    const dialogRef = this.dialog.open(CustomerAddressesDialogComponent, {
      data: { customer },
      maxWidth: '50em',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllCustomersForManagement();
      }
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
  mapCustomerEntityStatus(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'Aktif Müşteri';
      case EntityStatuses.inactive:
        return 'Pasif Müşteri';
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
