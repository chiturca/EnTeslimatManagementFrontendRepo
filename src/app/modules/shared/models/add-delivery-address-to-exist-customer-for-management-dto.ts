export interface AddDeliveryAddressToExistCustomerForManagementDto {
  customerId: number;
  cityKey: number;
  districtKey: number;
  neighbourhoodKey: number;
  address: string;
  sellerId: number;
  sellerAddressId: number;
  createdById: number;
}
