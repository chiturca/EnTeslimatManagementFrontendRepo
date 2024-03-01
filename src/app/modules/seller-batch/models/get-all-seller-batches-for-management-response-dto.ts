import { EntityStatuses } from '../../customer/models/enums/entity-statuses';
import { SellerBatchStatusEnum } from './enums/seller-batch-status-enum';

export interface GetAllSellerBatchesForManagementResponseDto {
  id: number;
  barcode: string;
  sellerName: string;
  sellerAddressName: string;
  warehouseName: string;
  responsableCityName: number;
  sellerBatchStatus: SellerBatchStatusEnum;
  entityStatus: EntityStatuses;
}
