import { CompanyTypes } from './enums/company-types';

export interface CreateSellerRequestDto {
  name: string;
  taxId: string;
  sellerCompanyType: CompanyTypes;
  createdById: number;
}
