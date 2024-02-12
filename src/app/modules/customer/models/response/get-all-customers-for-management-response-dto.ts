import { CustomerTypeEnum } from '../enums/customer-type-enum';
import { EntityStatuses } from '../enums/entity-statuses';
import { DeliveryAddressDtoVersion2 } from './delivery-address-dto-version2';

export interface GetAllCustomersForManagementResponseDto {
  id: number;
  customerName: string;
  customerType: CustomerTypeEnum;
  deliveryAddresses: DeliveryAddressDtoVersion2[];
  sellerName: string;
  sellerAddressName: string;
  entityStatus: EntityStatuses;
}
