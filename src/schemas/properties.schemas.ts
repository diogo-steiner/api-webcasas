import {
  RefinementCtx,
  any,
  array,
  boolean,
  date,
  literal,
  number,
  string,
  z,
} from "zod";
import { Regexs } from "../utils/regexs";
import { UsersSchemas } from "./users.schemas";

export class PropertiesSchemas {
  private static handleReturnNumber(value: number | string) {
    if (typeof value == "number") {
      return value;
    } else {
      return Number(value.replace(Regexs.regexOnlyNumber, ""));
    }
  }

  private static handleSuperRefineNumber(
    number: number | string,
    ctx: RefinementCtx,
    pathStr: string
  ) {
    if (number == undefined) {
      return ctx.addIssue({
        code: "custom",
        message: "Required",
        path: [pathStr],
      });
    }
    if (!(Number(number) >= 0 && Number(number) <= 32767)) {
      return ctx.addIssue({
        code: "custom",
        message: "Number must be between 0 and 32767",
        path: [pathStr],
      });
    }

    return this.handleReturnNumber(number);
  }

  static createPropertyRequest = z.object({
    title: string().trim().min(3).max(72),
    description: string().trim().min(6).max(900),
    numberRooms: any().transform((value: string | number, ctx: RefinementCtx) =>
      this.handleSuperRefineNumber(value, ctx, "numberRooms")
    ),
    numberBathrooms: any().transform(
      (value: string | number, ctx: RefinementCtx) =>
        this.handleSuperRefineNumber(value, ctx, "numberBathrooms")
    ),
    numberGarage: any().transform(
      (value: string | number, ctx: RefinementCtx) =>
        this.handleSuperRefineNumber(value, ctx, "numberGarage")
    ),
    propertyType: string().trim().min(2).max(16),
    isSale: boolean().default(true),
    isInCondo: boolean().default(false),
    hasPoolProperty: boolean().default(false),
    hasAirConditioningProperty: boolean().default(false),
    hasGrillProperty: boolean().default(false),
    hasFurnitureProperty: boolean().default(false),
    hasPollCondo: boolean().default(false),
    hasSecurity24hCondo: boolean().default(false),
    hasGymCondo: boolean().default(false),
    hasPartyHallCondo: boolean().default(false),
    price: string()
      .trim()
      .min(1)
      .max(12)
      .transform((value: string) => this.handleReturnNumber(value)),
    priceCondo: string()
      .trim()
      .min(1)
      .max(12)
      .transform((value: string) => this.handleReturnNumber(value))
      .optional(),
    isCondoPriceIncluded: boolean().default(false),
    state: string().trim().min(2).max(26),
    city: string().trim().min(2).max(26),
    contact: string()
      .trim()
      .transform((value: string) => value.replace(Regexs.regexOnlyNumber, ""))
      .refine((value: string) => value.length == 11),
    isDisplayContact: boolean().default(true),
  });

  private static basePropertyResponse = z.object({
    id: string(),
    title: string(),
    description: string(),
    numberRooms: number(),
    numberBathrooms: number(),
    numberGarage: number(),
    propertyType: string(),
    isSale: boolean(),
    isInCondo: boolean(),
    hasPoolProperty: boolean(),
    hasAirConditioningProperty: boolean(),
    hasGrillProperty: boolean(),
    hasFurnitureProperty: boolean(),
    hasPollCondo: boolean(),
    hasSecurity24hCondo: boolean(),
    hasGymCondo: boolean(),
    hasPartyHallCondo: boolean(),
    price: any().transform((value) => Number(value)),
    priceCondo: any()
      .transform((value) => Number(value))
      .nullable(),
    isCondoPriceIncluded: boolean(),
    state: string(),
    city: string(),
    isDisplayContact: boolean(),
    isActive: boolean(),
    viewsCounter: number(),
    updatedAt: date(),
    createdAt: date(),
  });

  private static basePropertyWithPhotosResponse =
    this.basePropertyResponse.extend({
      photos: array(
        z.object({
          id: string(),
          photoUrl: string(),
        })
      ),
    });

  private static basePropertyWithContactResponse =
    this.basePropertyWithPhotosResponse.extend({
      isDisplayContact: literal(true),
      contact: string(),
      owner: UsersSchemas.createUserResponse.optional(),
    });

  private static basePropertyWithoutContactResponse =
    this.basePropertyWithPhotosResponse.extend({
      isDisplayContact: literal(false),
      owner: UsersSchemas.createUserResponse.optional(),
    });

  static createPropertyResponse = this.basePropertyResponse.extend({
    contact: string(),
  });

  static getPropertyResponse = z.discriminatedUnion("isDisplayContact", [
    this.basePropertyWithoutContactResponse,
    this.basePropertyWithContactResponse,
  ]);

  static getAllPropertiesResponse = z.array(this.getPropertyResponse);

  static getAllPropertiesWithPagination = z.object({
    nextPage: string().nullable(),
    prevPage: string().nullable(),
    count: number(),
    content: this.getAllPropertiesResponse,
  });
}
