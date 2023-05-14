import { Prisma } from "@prisma/client";

interface IBaseProperty {
  title: string;
  description: string;
  numberRooms: number;
  numberBathrooms: number;
  numberGarage: number;
  propertyType: string;
  isSale: boolean;
  isInCondo: boolean;
  hasPoolProperty: boolean;
  hasAirConditioningProperty: boolean;
  hasGrillProperty: boolean;
  hasFurnitureProperty: boolean;
  hasPollCondo: boolean;
  hasSecurity24hCondo: boolean;
  hasGymCondo: boolean;
  hasPartyHallCondo: boolean;
  price: Prisma.Decimal;
  priceCondo: Prisma.Decimal | null;
  isCondoPriceIncluded: boolean;
  state: string;
  city: string;
  isDisplayContact: boolean;
  isActive: boolean;
}

export interface ICreatePropertyRequest extends IBaseProperty {
  contact: string;
}

export interface IFindByQueryRequest {
  state?: string;
  city?: string;
  propertyType?: string;
  isSale?: string | boolean | undefined;
  isInCondo?: string | boolean | undefined;
  hasPoolProperty?: string | boolean | undefined;
  hasFurnitureProperty?: string | boolean | undefined;
  hasAirConditioningProperty?: string | boolean | undefined;
  hasGrillProperty?: string | boolean | undefined;
}

interface IPropertyPhoto {
  id: string;
  photoUrl: string;
  propertyId: string;
}

export interface IPropertyResponse extends IBaseProperty {
  contact?: string;
  photos?: IPropertyPhoto[];
}
