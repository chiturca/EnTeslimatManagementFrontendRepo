import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerEmployeeTitleEnum } from './enums/seller-employee-title-enum';

export interface GetSellerEmployeeForManagementResponseDto {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  createdTime: Date;
  sellerName: string;
  sellerAddressName: string;
  entityStatus: EntityStatuses;
  sellerEmployeeTitle: SellerEmployeeTitleEnum;
}
