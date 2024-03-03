import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GetUserByRefreshTokenResponseDtoModel } from '../../user/models/response/get-user-by-refresh-token-response-dto-model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user/services/user.service';
import { GetSellerEmployeeForManagementResponseDto } from '../models/get-seller-employee-for-management-response-dto';
import { SellerEmployeesService } from '../services/seller-employees.service';
import { CreateSellerEmployeeDialogComponent } from '../../shared/components/Dialogs/SellerEmployee/create-seller-employee-dialog/create-seller-employee-dialog.component';
import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerEmployeeTitleEnum } from '../models/enums/seller-employee-title-enum';

@Component({
  selector: 'app-seller-employee',
  templateUrl: './seller-employee.component.html',
  styleUrls: ['./seller-employee.component.css'],
})
export class SellerEmployeeComponent implements OnInit, AfterViewInit {
  isLoaded: boolean = false;
  getUserFromAuthByDtoModel: GetUserByRefreshTokenResponseDtoModel;
  searchInputControl: FormControl = new FormControl('');
  dataSource!: MatTableDataSource<GetSellerEmployeeForManagementResponseDto>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatAutocomplete) auto!: MatAutocomplete;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private sellerEmployeesService: SellerEmployeesService,
    private userService: UserService,
    private toastrService: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.dataSource =
      new MatTableDataSource<GetSellerEmployeeForManagementResponseDto>();
    this.getUserFromAuthByDtoModel =
      {} as GetUserByRefreshTokenResponseDtoModel;
  }
  ngOnInit(): void {
    this.getUserFromAuthByDto();
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
  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
      this.isLoaded = false;
      this.getAllSellerEmployeesForManagement();
    });
  }
  getAllSellerEmployeesForManagement(): void {
    this.sellerEmployeesService.getAllSellerEmployeesForManagement().subscribe({
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
  openCreateSellerEmployeeDialog(): void {
    const dialogRef = this.dialog.open(CreateSellerEmployeeDialogComponent, {
      maxWidth: '50em',
    });
  }
  formatCreatedTime(createdTime: Date | null): string {
    return this.datePipe.transform(createdTime, 'dd.MM.yyyy HH:mm') || '';
  }
  mapSellerEmployeeTitleEnum(status: SellerEmployeeTitleEnum): string {
    switch (status) {
      case SellerEmployeeTitleEnum.Regular:
        return 'Çalışan';
      case SellerEmployeeTitleEnum.Moderator:
        return 'Moderatör';
      case SellerEmployeeTitleEnum.Owner:
        return 'Şirket Sahibi';
      default:
        return 'Bilinmeyen Durum';
    }
  }
  getSellerEmployeeTitleEnumBg(status: SellerEmployeeTitleEnum): string {
    switch (status) {
      case SellerEmployeeTitleEnum.Regular:
        return '#fde047';
      case SellerEmployeeTitleEnum.Moderator:
        return '#d9f99d';
      case SellerEmployeeTitleEnum.Owner:
        return '#86efac';
      default:
        return '#f3f4f6';
    }
  }
  getSellerEmployeeTitleEnumColor(status: SellerEmployeeTitleEnum): string {
    switch (status) {
      case SellerEmployeeTitleEnum.Regular:
        return '#854d0e';
      case SellerEmployeeTitleEnum.Moderator:
        return '#3f6212';
      case SellerEmployeeTitleEnum.Owner:
        return '#14532d';
      default:
        return '#4b5563';
    }
  }
  mapEntityStatus(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'Aktif Satıcı';
      case EntityStatuses.inactive:
        return 'Pasif Satıcı';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
  getColor(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgb(34 197 94)';
      case EntityStatuses.inactive:
        return 'red';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
  getBg(type: EntityStatuses): string {
    switch (type) {
      case EntityStatuses.active:
        return 'rgba(34, 197, 94, 0.2)';
      case EntityStatuses.inactive:
        return 'rgba(255, 0, 0, 0.2)';
      default:
        return 'Bilinmeyen Satıcı Tipi';
    }
  }
}
