import type {
  Gender,
  Country,
  CategoryEntity,
  InjusticeType,
  Entity,
  Sector,
  IndustryType,
} from "../types";

import { authApi } from "./api";

interface UploadCataloguePictureResponse {
  message: string;
  mongoDocumentId: string;
  mongoFileId: string;
  fileMetadataId: string;
  picture: {
    fileName: string;
    fileSize: number;
    contentType: string;
    mongoFileId: string;
    gridFsId: string;
  };
}

/* Gender */

export const getGenders = async (): Promise<Gender[]> => {
  const response = await authApi.get<Gender[]>("/api/catalogues/genders");
  return response.data;
};

export const getGenderById = async (genderId: number): Promise<Gender> => {
  const response = await authApi.get<Gender>(
    `/api/catalogues/genders/${genderId}`
  );
  return response.data;
};

export const createGender = async (gender: Partial<Gender>): Promise<Gender> => {
  const response = await authApi.post<Gender>("/api/catalogues/genders", gender);
  return response.data;
};

export const updateGender = async (
  genderId: number,
  gender: Partial<Gender>
): Promise<Gender> => {
  const response = await authApi.put<Gender>(
    `/api/catalogues/genders/${genderId}`,
    gender
  );
  return response.data;
};

export const deleteGender = async (genderId: number): Promise<void> => {
  await authApi.delete(`/api/catalogues/genders/${genderId}`);
};

/* Country */

export const getCountries = async (): Promise<Country[]> => {
  const response = await authApi.get<Country[]>("/api/catalogues/countries");
  return response.data;
};

export const getCountryById = async (countryId: number): Promise<Country> => {
  const response = await authApi.get<Country>(
    `/api/catalogues/countries/${countryId}`
  );
  return response.data;
};

export const createCountry = async (
  country: Partial<Country>
): Promise<Country> => {
  const response = await authApi.post<Country>(
    "/api/catalogues/countries",
    country
  );
  return response.data;
};

export const updateCountry = async (
  countryId: number,
  country: Partial<Country>
): Promise<Country> => {
  const response = await authApi.put<Country>(
    `/api/catalogues/countries/${countryId}`,
    country
  );
  return response.data;
};

export const deleteCountry = async (countryId: number): Promise<void> => {
  await authApi.delete(`/api/catalogues/countries/${countryId}`);
};

/* CategoryEntity */

export const getCategoryEntities = async (): Promise<CategoryEntity[]> => {
  const response = await authApi.get<CategoryEntity[]>(
    "/api/catalogues/category-entities"
  );
  return response.data;
};

export const getCategoryEntityById = async (
  categoryEntityId: number
): Promise<CategoryEntity> => {
  const response = await authApi.get<CategoryEntity>(
    `/api/catalogues/category-entities/${categoryEntityId}`
  );
  return response.data;
};

export const createCategoryEntity = async (
  categoryEntity: Partial<CategoryEntity>
): Promise<CategoryEntity> => {
  const response = await authApi.post<CategoryEntity>(
    "/api/catalogues/category-entities",
    categoryEntity
  );
  return response.data;
};

/* Entity Pictures */

export const getEntityPictureUrl = (
  entityId: number,
  version?: string | number
): string => {
  const query = version ? `?v=${encodeURIComponent(String(version))}` : "";

  return `${authApi.defaults.baseURL}/api/files/entities/${entityId}/picture${query}`;
};

export const uploadEntityPicture = async (
  entityId: number,
  file: File
): Promise<UploadCataloguePictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authApi.put<UploadCataloguePictureResponse>(
    `/api/files/entities/${entityId}/picture`,
    formData
  );

  return response.data;
};

/* InjusticeType Pictures */

export const getInjusticeTypePictureUrl = (
  injusticeTypeId: number,
  version?: string | number
): string => {
  const query = version ? `?v=${encodeURIComponent(String(version))}` : "";

  return `${authApi.defaults.baseURL}/api/files/injustice-types/${injusticeTypeId}/picture${query}`;
};

export const uploadInjusticeTypePicture = async (
  injusticeTypeId: number,
  file: File
): Promise<UploadCataloguePictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authApi.put<UploadCataloguePictureResponse>(
    `/api/files/injustice-types/${injusticeTypeId}/picture`,
    formData
  );

  return response.data;
};

export const updateCategoryEntity = async (
  categoryEntityId: number,
  categoryEntity: Partial<CategoryEntity>
): Promise<CategoryEntity> => {
  const response = await authApi.put<CategoryEntity>(
    `/api/catalogues/category-entities/${categoryEntityId}`,
    categoryEntity
  );
  return response.data;
};

export const deleteCategoryEntity = async (
  categoryEntityId: number
): Promise<void> => {
  await authApi.delete(
    `/api/catalogues/category-entities/${categoryEntityId}`
  );
};

/* InjusticeType */

export const getInjusticeTypes = async (): Promise<InjusticeType[]> => {
  const response = await authApi.get<InjusticeType[]>(
    "/api/catalogues/injustice-types"
  );
  return response.data;
};

export const getInjusticeTypeById = async (
  injusticeTypeId: number
): Promise<InjusticeType> => {
  const response = await authApi.get<InjusticeType>(
    `/api/catalogues/injustice-types/${injusticeTypeId}`
  );
  return response.data;
};

export const createInjusticeType = async (
  injusticeType: Partial<InjusticeType>
): Promise<InjusticeType> => {
  const response = await authApi.post<InjusticeType>(
    "/api/catalogues/injustice-types",
    injusticeType
  );
  return response.data;
};

export const updateInjusticeType = async (
  injusticeTypeId: number,
  injusticeType: Partial<InjusticeType>
): Promise<InjusticeType> => {
  const response = await authApi.put<InjusticeType>(
    `/api/catalogues/injustice-types/${injusticeTypeId}`,
    injusticeType
  );
  return response.data;
};

export const deleteInjusticeType = async (
  injusticeTypeId: number
): Promise<void> => {
  await authApi.delete(
    `/api/catalogues/injustice-types/${injusticeTypeId}`
  );
};

/* Entity */

export const getEntities = async (): Promise<Entity[]> => {
  const response = await authApi.get<Entity[]>("/api/catalogues/entities");
  return response.data;
};

export const getEntityById = async (entityId: number): Promise<Entity> => {
  const response = await authApi.get<Entity>(
    `/api/catalogues/entities/${entityId}`
  );

  return response.data;
};

export const createEntity = async (
  entity: Partial<Entity>
): Promise<Entity> => {
  const response = await authApi.post<Entity>(
    "/api/catalogues/entities",
    entity
  );

  return response.data;
};

export const updateEntity = async (
  entityId: number,
  entity: Partial<Entity>
): Promise<Entity> => {
  const response = await authApi.put<Entity>(
    `/api/catalogues/entities/${entityId}`,
    entity
  );

  return response.data;
};

export const deleteEntity = async (entityId: number): Promise<void> => {
  await authApi.delete(`/api/catalogues/entities/${entityId}`);
};

/* Sector */

export const getSectors = async (): Promise<Sector[]> => {
  const response = await authApi.get<Sector[]>("/api/catalogues/sectors");
  return response.data;
};

export const createSector = async (
  sector: Partial<Sector>
): Promise<Sector> => {
  const response = await authApi.post<Sector>(
    "/api/catalogues/sectors",
    sector
  );

  return response.data;
};

export const updateSector = async (
  sectorId: number,
  sector: Partial<Sector>
): Promise<Sector> => {
  const response = await authApi.put<Sector>(
    `/api/catalogues/sectors/${sectorId}`,
    sector
  );

  return response.data;
};

export const deleteSector = async (sectorId: number): Promise<void> => {
  await authApi.delete(`/api/catalogues/sectors/${sectorId}`);
};

/* IndustryType */

export const getIndustryTypes = async (): Promise<IndustryType[]> => {
  const response = await authApi.get<IndustryType[]>(
    "/api/catalogues/industry-types"
  );

  return response.data;
};