import { Router } from "express";

import {
  getGenders,
  getGenderById,
  createGender,
  updateGender,
  deleteGender,

  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,

  getCategoryEntities,
  getCategoryEntityById,
  createCategoryEntity,
  updateCategoryEntity,
  deleteCategoryEntity,

  getEntities,
  getEntityById,
  createEntity,
  updateEntity,
  deleteEntity,

  getInjusticeTypes,
  getInjusticeTypeById,
  createInjusticeType,
  updateInjusticeType,
  deleteInjusticeType,

  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
  getIndustryTypes,
} from "./catalogues.controller";

const router = Router();

// Gender
router.get("/genders", getGenders);
router.get("/genders/:genderId", getGenderById);
router.post("/genders", createGender);
router.put("/genders/:genderId", updateGender);
router.delete("/genders/:genderId", deleteGender);

// Country
router.get("/countries", getCountries);
router.get("/countries/:countryId", getCountryById);
router.post("/countries", createCountry);
router.put("/countries/:countryId", updateCountry);
router.delete("/countries/:countryId", deleteCountry);

// CategoryEntity
router.get("/category-entities", getCategoryEntities);
router.get("/category-entities/:categoryEntityId", getCategoryEntityById);
router.post("/category-entities", createCategoryEntity);
router.put("/category-entities/:categoryEntityId", updateCategoryEntity);
router.delete("/category-entities/:categoryEntityId", deleteCategoryEntity);

// InjusticeType
router.get("/injustice-types", getInjusticeTypes);
router.get("/injustice-types/:injusticeTypeId", getInjusticeTypeById);
router.post("/injustice-types", createInjusticeType);
router.put("/injustice-types/:injusticeTypeId", updateInjusticeType);
router.delete("/injustice-types/:injusticeTypeId", deleteInjusticeType);

// Entity
router.get("/entities", getEntities);
router.get("/entities/:entityId", getEntityById);
router.post("/entities", createEntity);
router.put("/entities/:entityId", updateEntity);
router.delete("/entities/:entityId", deleteEntity);

// Sector
router.get("/sectors", getSectors);
router.get("/sectors/:sectorId", getSectorById);
router.post("/sectors", createSector);
router.put("/sectors/:sectorId", updateSector);
router.delete("/sectors/:sectorId", deleteSector);

// IndustryType
router.get("/industry-types", getIndustryTypes);

export default router;
