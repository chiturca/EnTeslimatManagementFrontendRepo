export interface AddSellerAddressToSellerRequestDto {
  sellerId: number;
  cityKey: number;
  districtKey: number;
  neighbourhoodKey: number;
  address: string;
  createdById: number;
}
