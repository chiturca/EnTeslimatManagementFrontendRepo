import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerCompanyTypeEnum } from './enums/seller-company-type-enum';

export interface GetAllSellerResponseDto {
  id: number;
  name: string;
  taxId: string;
  createdTime: Date;
  createdByName: string;
  sellerCompanyType: SellerCompanyTypeEnum;
  entitiyStatus: EntityStatuses;
}
