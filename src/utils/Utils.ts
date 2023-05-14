import { IPropertyResponse } from "../interfaces/properties.interfaces";

export class Utils {
  static handleUrlPaginateProperties(
    properties: IPropertyResponse[],
    baseUrl: string,
    page: number,
    limit: number
  ) {
    const countNextPage = properties.length - 1 == limit && page + 1;
    const countPrevPage = !(page == 1) && page - 1;

    let nextPage: string | null = null;
    let prevPage: string | null = null;
    if (countNextPage) {
      nextPage = `${baseUrl}page=${countNextPage}&limit=${limit}`;
    }
    if (countPrevPage) {
      prevPage = `${baseUrl}page=${countPrevPage}&limit=${limit}`;
    }

    if (properties.length > limit) {
      properties.pop();
    }

    return {
      nextPage,
      prevPage,
      count: properties.length,
      content: properties,
    };
  }
}
