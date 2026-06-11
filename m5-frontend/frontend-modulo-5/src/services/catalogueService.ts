import type { Gender, Country } from "../types";
import { authApi } from "./api";

export const getGenders = async (): Promise<Gender[]> => {
  const response = await authApi.get<Gender[]>("/api/catalogues/genders");
  return response.data;
};

export const getCountries = async (): Promise<Country[]> => {
  const response = await authApi.get<Country[]>("/api/catalogues/countries");
  return response.data;
};