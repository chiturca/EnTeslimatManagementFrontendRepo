import { Component, OnInit, ViewChild } from '@angular/core';
import { GetAllCustomersForManagementResponseDto } from '../models/response/get-all-customers-for-management-response-dto';
import { CustomerService } from '../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  allCustomers: GetAllCustomersForManagementResponseDto[] = [];
  isLoaded: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllCustomersForManagement();
    console.log();
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
}
