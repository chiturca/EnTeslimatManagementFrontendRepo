export interface GetAllSellerAddressesResponseDto {
  id: number;
  cityName: string;
  districtName: string;
  neighbourhoodName: string;
  address: string;
  //needs address entityStatus for ui disable for activate inactivate
}
