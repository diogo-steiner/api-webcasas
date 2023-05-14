import { PrismaClient } from "@prisma/client";
import {
  ICreatePropertyRequest,
  IFindByQueryRequest,
} from "../interfaces/properties.interfaces";
import { PropertiesSchemas } from "../schemas/properties.schemas";
import { AppError } from "../errors";
import { Utils } from "../utils/Utils";
import { IPaginate } from "../interfaces/express.interfaces";

const prisma = new PrismaClient();

export class PropertiesServices {
  static async create(ownerId: string, dataProperty: ICreatePropertyRequest) {
    const owner = await prisma.users.findFirst({ where: { id: ownerId } });

    const newProperty = await prisma.properties.create({
      data: { ...dataProperty, ownerId: owner?.id! },
    });

    return PropertiesSchemas.createPropertyResponse.parse(newProperty);
  }

  static async createPhotos(propertyId: string, files: any) {
    const property = await prisma.properties.findFirst({
      where: { id: propertyId },
      include: { photos: true },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (property?.photos.length! + files.length > 4) {
      throw new AppError(
        "The property has already reached the maximum number of photos",
        403
      );
    }

    const photosWithProperty = files.map((photo: any) => {
      return { photoUrl: photo.path, propertyId: property?.id };
    });

    return prisma.propertiesPhotos.createMany({
      data: photosWithProperty,
    });
  }

  static async getById(propertyId: string) {
    const property = await prisma.properties.findFirst({
      where: { id: propertyId, isActive: true },
      include: { photos: true, owner: true },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    await prisma.properties.update({
      where: { id: propertyId },
      data: { viewsCounter: property?.viewsCounter! + 1 },
    });

    return PropertiesSchemas.getPropertyResponse.parse(property);
  }

  static async getAllInHigh(paginate: IPaginate) {
    const { skip, take, baseUrl, page, limit } = paginate;
    const properties = await prisma.properties.findMany({
      where: { isActive: true },
      include: { photos: true },
      orderBy: { viewsCounter: "desc" },
      skip,
      take,
    });

    const dataProperties = Utils.handleUrlPaginateProperties(
      properties,
      baseUrl,
      page,
      limit
    );
    return PropertiesSchemas.getAllPropertiesWithPagination.parse(
      dataProperties
    );
  }

  static async getAllPropertiesUser(userId: string, paginate: IPaginate) {
    const { skip, take, baseUrl, page, limit } = paginate;
    const properties = await prisma.properties.findMany({
      where: { owner: { id: userId } },
      include: { photos: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    const dataProperties = Utils.handleUrlPaginateProperties(
      properties,
      baseUrl,
      page,
      limit
    );

    return PropertiesSchemas.getAllPropertiesWithPagination.parse(
      dataProperties
    );
  }

  static async deactivate(propertyId: string, ownerId: string) {
    const property = await prisma.properties.findFirst({
      where: { id: propertyId, ownerId: ownerId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (property.isActive) {
      await prisma.properties.update({
        where: { id: propertyId },
        data: { isActive: false },
      });
    }

    return {};
  }

  static async activate(propertyId: string, ownerId: string) {
    const property = await prisma.properties.findFirst({
      where: { id: propertyId, ownerId: ownerId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (!property.isActive) {
      await prisma.properties.update({
        where: { id: propertyId },
        data: { isActive: true },
      });
    }

    return {};
  }

  static async delete(propertyId: string, ownerId: string) {
    const porperty = await prisma.properties.findFirst({
      where: { id: propertyId, ownerId: ownerId },
    });

    if (!porperty) {
      throw new AppError("Property not found", 404);
    }

    await prisma.properties.delete({ where: { id: propertyId } });

    return {};
  }

  static async getAllByFilters(
    querys: IFindByQueryRequest,
    paginate: IPaginate
  ) {
    const { skip, take, baseUrl, page, limit } = paginate;
    let {
      city,
      state,
      propertyType,
      isSale,
      isInCondo,
      hasPoolProperty,
      hasFurnitureProperty,
      hasAirConditioningProperty,
      hasGrillProperty,
    } = querys;

    propertyType = propertyType
      ?.split(",")
      .filter((tyoe) => tyoe != "undefined" && tyoe)
      .join(" | ");

    isSale = String(isSale).toLocaleLowerCase();
    if (isSale == "false" || isSale == "true") {
      isSale = isSale == "true";
    } else {
      isSale = undefined;
    }

    isInCondo = String(isInCondo).toLowerCase();
    if (isInCondo == "false" || isInCondo == "true") {
      isInCondo = isInCondo == "true";
    } else {
      isInCondo = undefined;
    }

    hasPoolProperty = String(hasPoolProperty).toLowerCase();
    if (hasPoolProperty == "false" || hasPoolProperty == "true") {
      hasPoolProperty = hasPoolProperty == "true";
    } else {
      hasPoolProperty = undefined;
    }

    hasFurnitureProperty = String(hasFurnitureProperty).toLowerCase();
    if (hasFurnitureProperty == "false" || hasFurnitureProperty == "true") {
      hasFurnitureProperty = hasFurnitureProperty == "true";
    } else {
      hasFurnitureProperty = undefined;
    }

    hasGrillProperty = String(hasGrillProperty).toLowerCase();
    if (hasGrillProperty == "false" || hasGrillProperty == "true") {
      hasGrillProperty = hasGrillProperty == "true";
    } else {
      hasGrillProperty = undefined;
    }

    hasAirConditioningProperty = String(
      hasAirConditioningProperty
    ).toLowerCase();
    if (
      hasAirConditioningProperty == "false" ||
      hasAirConditioningProperty == "true"
    ) {
      hasAirConditioningProperty = hasAirConditioningProperty == "true";
    } else {
      hasAirConditioningProperty = undefined;
    }

    const properties = await prisma.properties.findMany({
      where: {
        city: {
          search: city == "undefined" ? undefined : city?.split(" ").join("&"),
        },
        state: { search: state == "undefined" ? undefined : state },
        propertyType: {
          search: propertyType == "" ? undefined : propertyType,
        },
        isSale,
        isInCondo,
        hasPoolProperty,
        hasFurnitureProperty,
        hasGrillProperty,
        hasAirConditioningProperty,
        isActive: true,
      },

      include: { photos: true },
      skip,
      take,
    });

    const dataProperties = Utils.handleUrlPaginateProperties(
      properties,
      baseUrl,
      page,
      limit
    );
    return PropertiesSchemas.getAllPropertiesWithPagination.parse(
      dataProperties
    );
  }

  static async getAll(paginate: IPaginate) {
    const { baseUrl, skip, take, page, limit } = paginate;

    const properties = await prisma.properties.findMany({
      where: { isActive: true },
      include: { photos: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });

    const dataProperties = Utils.handleUrlPaginateProperties(
      properties,
      baseUrl,
      page,
      limit
    );
    return PropertiesSchemas.getAllPropertiesWithPagination.parse(
      dataProperties
    );
  }
}
