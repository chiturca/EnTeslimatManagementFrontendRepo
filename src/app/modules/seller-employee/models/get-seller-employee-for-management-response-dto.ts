import { EntityStatuses } from '../../customer/models/enums/entity-statuses';

export interface GetSellerEmployeeForManagementResponseDto {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  createdTime: Date;
  sellerName: string;
  sellerAddressName: string;
  entityStatus: EntityStatuses;
  roles: string[];
}
