import { SellerEmployeeTitleEnum } from './enums/seller-employee-title-enum';

export interface CreateSellerEmployeeDto {
  identityNumber: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  sellerId: number;
  sellerAddressId: number;
  createdById: number;
  sellerEmployeeTitle: SellerEmployeeTitleEnum;
}
