import { EntityStatuses } from '../../customer/models/enums/entity-statuses';

export interface GetAllSellerResponseDto {
  id: number;
  name: string;
  taxId: string;
  createdTime: Date;
  createByName: string;
  entitiyStatus: EntityStatuses;
}
