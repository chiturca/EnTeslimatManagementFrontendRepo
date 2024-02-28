import { DeliveryTypeEnum } from './enums/delivery-type-enum';
import { ReceiverTypeEnum } from './enums/receiver-type-enum';

export interface GetPackageDetailsForManagementResponseDto {
  packageId: number;
  deliveryType: DeliveryTypeEnum;
  warehouseAddressName: string;
  assignedCarrierFullName: string;
  receiverType: ReceiverTypeEnum;
  receiverFullName: string;
}
