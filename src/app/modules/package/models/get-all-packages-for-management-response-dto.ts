import { DeliveryStatusEnum } from './enums/delivery-status-enum';
import { EntityStatuses } from '../../customer/models/enums/entity-statuses';

export interface GetAllPackagesForManagementResponseDto {
  packageId: number;
  packageBarcode: string;
  sellerName: string;
  sellerAddressName: string;
  customerName: string;
  deliveryStatusType: DeliveryStatusEnum;
  desi: number;
  weight: number;
  price: number;
  entityStatus: EntityStatuses;
}
