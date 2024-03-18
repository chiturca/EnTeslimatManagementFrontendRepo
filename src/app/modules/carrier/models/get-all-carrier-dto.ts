import { EntityStatuses } from "../../customer/models/enums/entity-statuses";

export interface GetAllCarrierDto {
    firstName:string;
    middleName?:string;
    lastName:string;
    phoneNumber:string;
    carrierUniqueCode:string;
    email:string;
    entityStatus:EntityStatuses
}
