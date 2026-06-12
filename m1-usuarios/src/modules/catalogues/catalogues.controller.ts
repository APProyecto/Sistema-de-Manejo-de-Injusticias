import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

import {
  createOrUpdateEntityDocument,
  createOrUpdateInjusticeTypeDocument
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

/* =========================
   GENDER
========================= */

export async function getGenders(_req: Request, res: Response) {
  try {
    const genders = await prisma.gender.findMany({
      orderBy: {
        GenderID: "asc",
      },
    });

    return res.status(200).json(genders);
  } catch (error) {
    console.error("getGenders error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getGenderById(req: Request, res: Response) {
  try {
    const genderId = Number(req.params.genderId);

    if (!Number.isInteger(genderId) || genderId <= 0) {
      return res.status(400).json({
        error: "Invalid genderId",
      });
    }

    const gender = await prisma.gender.findUnique({
      where: {
        GenderID: genderId,
      },
    });

    if (!gender) {
      return res.status(404).json({
        error: "Gender not found",
      });
    }

    return res.status(200).json(gender);
  } catch (error) {
    console.error("getGenderById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createGender(req: Request, res: Response) {
  try {
    const { genderName, createdBy } = req.body;

    if (!genderName || typeof genderName !== "string" || genderName.trim() === "") {
      return res.status(400).json({
        error: "genderName is required",
      });
    }

    const gender = await prisma.gender.create({
      data: {
        GenderName: genderName.trim(),
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    return res.status(201).json({
      message: "Gender created successfully",
      gender,
    });
  } catch (error: any) {
    console.error("createGender error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Gender already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid createdBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateGender(req: Request, res: Response) {
  try {
    const genderId = Number(req.params.genderId);
    const { genderName, modifiedBy } = req.body;

    if (!Number.isInteger(genderId) || genderId <= 0) {
      return res.status(400).json({
        error: "Invalid genderId",
      });
    }

    if (!genderName || typeof genderName !== "string" || genderName.trim() === "") {
      return res.status(400).json({
        error: "genderName is required",
      });
    }

    const gender = await prisma.gender.update({
      where: {
        GenderID: genderId,
      },
      data: {
        GenderName: genderName.trim(),
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    return res.status(200).json({
      message: "Gender updated successfully",
      gender,
    });
  } catch (error: any) {
    console.error("updateGender error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Gender not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Gender already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid modifiedBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteGender(req: Request, res: Response) {
  try {
    const genderId = Number(req.params.genderId);

    if (!Number.isInteger(genderId) || genderId <= 0) {
      return res.status(400).json({
        error: "Invalid genderId",
      });
    }

    await prisma.gender.delete({
      where: {
        GenderID: genderId,
      },
    });

    return res.status(200).json({
      message: "Gender deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteGender error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Gender not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this gender because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   COUNTRY
========================= */

export async function getCountries(_req: Request, res: Response) {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        CountryID: "asc",
      },
      include: {
        Continent: true,
      },
    });

    return res.status(200).json(countries);
  } catch (error) {
    console.error("getCountries error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getCountryById(req: Request, res: Response) {
  try {
    const countryId = Number(req.params.countryId);

    if (!Number.isInteger(countryId) || countryId <= 0) {
      return res.status(400).json({
        error: "Invalid countryId",
      });
    }

    const country = await prisma.country.findUnique({
      where: {
        CountryID: countryId,
      },
      include: {
        Continent: true,
      },
    });

    if (!country) {
      return res.status(404).json({
        error: "Country not found",
      });
    }

    return res.status(200).json(country);
  } catch (error) {
    console.error("getCountryById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createCountry(req: Request, res: Response) {
  try {
    const { countryName, continentId, createdBy } = req.body;

    if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
      return res.status(400).json({
        error: "countryName is required",
      });
    }

    const parsedContinentId = Number(continentId);

    if (!Number.isInteger(parsedContinentId) || parsedContinentId <= 0) {
      return res.status(400).json({
        error: "valid continentId is required",
      });
    }

    const continent = await prisma.continent.findUnique({
      where: {
        ContinentID: parsedContinentId,
      },
    });

    if (!continent) {
      return res.status(404).json({
        error: "Continent not found",
      });
    }

    const country = await prisma.country.create({
      data: {
        CountryName: countryName.trim(),
        ContinentID: parsedContinentId,
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    return res.status(201).json({
      message: "Country created successfully",
      country,
    });
  } catch (error: any) {
    console.error("createCountry error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Country already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid foreign key value",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateCountry(req: Request, res: Response) {
  try {
    const countryId = Number(req.params.countryId);
    const { countryName, continentId, modifiedBy } = req.body;

    if (!Number.isInteger(countryId) || countryId <= 0) {
      return res.status(400).json({
        error: "Invalid countryId",
      });
    }

    if (!countryName || typeof countryName !== "string" || countryName.trim() === "") {
      return res.status(400).json({
        error: "countryName is required",
      });
    }

    const parsedContinentId = Number(continentId);

    if (!Number.isInteger(parsedContinentId) || parsedContinentId <= 0) {
      return res.status(400).json({
        error: "valid continentId is required",
      });
    }

    const continent = await prisma.continent.findUnique({
      where: {
        ContinentID: parsedContinentId,
      },
    });

    if (!continent) {
      return res.status(404).json({
        error: "Continent not found",
      });
    }

    const country = await prisma.country.update({
      where: {
        CountryID: countryId,
      },
      data: {
        CountryName: countryName.trim(),
        ContinentID: parsedContinentId,
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    return res.status(200).json({
      message: "Country updated successfully",
      country,
    });
  } catch (error: any) {
    console.error("updateCountry error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Country not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Country already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid foreign key value",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteCountry(req: Request, res: Response) {
  try {
    const countryId = Number(req.params.countryId);

    if (!Number.isInteger(countryId) || countryId <= 0) {
      return res.status(400).json({
        error: "Invalid countryId",
      });
    }

    await prisma.country.delete({
      where: {
        CountryID: countryId,
      },
    });

    return res.status(200).json({
      message: "Country deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteCountry error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Country not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this country because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   CATEGORY ENTITY
========================= */

export async function getCategoryEntities(_req: Request, res: Response) {
  try {
    const categoryEntities = await prisma.categoryEntity.findMany({
      orderBy: {
        CategoryEntityID: "asc",
      },
    });

    return res.status(200).json(categoryEntities);
  } catch (error) {
    console.error("getCategoryEntities error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getCategoryEntityById(req: Request, res: Response) {
  try {
    const categoryEntityId = Number(req.params.categoryEntityId);

    if (!Number.isInteger(categoryEntityId) || categoryEntityId <= 0) {
      return res.status(400).json({
        error: "Invalid categoryEntityId",
      });
    }

    const categoryEntity = await prisma.categoryEntity.findUnique({
      where: {
        CategoryEntityID: categoryEntityId,
      },
    });

    if (!categoryEntity) {
      return res.status(404).json({
        error: "Category entity not found",
      });
    }

    return res.status(200).json(categoryEntity);
  } catch (error) {
    console.error("getCategoryEntityById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createCategoryEntity(req: Request, res: Response) {
  try {
    const { categoryName, createdBy } = req.body;

    if (!categoryName || typeof categoryName !== "string" || categoryName.trim() === "") {
      return res.status(400).json({
        error: "categoryName is required",
      });
    }

    const categoryEntity = await prisma.categoryEntity.create({
      data: {
        CategoryName: categoryName.trim(),
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    return res.status(201).json({
      message: "Category entity created successfully",
      categoryEntity,
    });
  } catch (error: any) {
    console.error("createCategoryEntity error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Category entity already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid createdBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateCategoryEntity(req: Request, res: Response) {
  try {
    const categoryEntityId = Number(req.params.categoryEntityId);
    const { categoryName, modifiedBy } = req.body;

    if (!Number.isInteger(categoryEntityId) || categoryEntityId <= 0) {
      return res.status(400).json({
        error: "Invalid categoryEntityId",
      });
    }

    if (!categoryName || typeof categoryName !== "string" || categoryName.trim() === "") {
      return res.status(400).json({
        error: "categoryName is required",
      });
    }

    const categoryEntity = await prisma.categoryEntity.update({
      where: {
        CategoryEntityID: categoryEntityId,
      },
      data: {
        CategoryName: categoryName.trim(),
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    return res.status(200).json({
      message: "Category entity updated successfully",
      categoryEntity,
    });
  } catch (error: any) {
    console.error("updateCategoryEntity error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Category entity not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Category entity already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid modifiedBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteCategoryEntity(req: Request, res: Response) {
  try {
    const categoryEntityId = Number(req.params.categoryEntityId);

    if (!Number.isInteger(categoryEntityId) || categoryEntityId <= 0) {
      return res.status(400).json({
        error: "Invalid categoryEntityId",
      });
    }

    await prisma.categoryEntity.delete({
      where: {
        CategoryEntityID: categoryEntityId,
      },
    });

    return res.status(200).json({
      message: "Category entity deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteCategoryEntity error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Category entity not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this category entity because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   INJUSTICE TYPE
========================= */

export async function getInjusticeTypes(_req: Request, res: Response) {
  try {
    const injusticeTypes = await prisma.injusticeType.findMany({
      orderBy: {
        InjusticeTypeID: "asc",
      },
    });

    return res.status(200).json(injusticeTypes);
  } catch (error) {
    console.error("getInjusticeTypes error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getInjusticeTypeById(req: Request, res: Response) {
  try {
    const injusticeTypeId = Number(req.params.injusticeTypeId);

    if (!Number.isInteger(injusticeTypeId) || injusticeTypeId <= 0) {
      return res.status(400).json({
        error: "Invalid injusticeTypeId",
      });
    }

    const injusticeType = await prisma.injusticeType.findUnique({
      where: {
        InjusticeTypeID: injusticeTypeId,
      },
    });

    if (!injusticeType) {
      return res.status(404).json({
        error: "Injustice type not found",
      });
    }

    return res.status(200).json(injusticeType);
  } catch (error) {
    console.error("getInjusticeTypeById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createInjusticeType(req: Request, res: Response) {
  try {
    const { injusticeName, createdBy } = req.body;

    if (
      !injusticeName ||
      typeof injusticeName !== "string" ||
      injusticeName.trim() === ""
    ) {
      return res.status(400).json({
        error: "injusticeName is required",
      });
    }

    const injusticeType = await prisma.injusticeType.create({
      data: {
        InjusticeName: injusticeName.trim(),
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    const mongoDocument = await createOrUpdateInjusticeTypeDocument(
      injusticeType.InjusticeTypeID,
      injusticeType.InjusticeName
    );

    let updatedInjusticeType = injusticeType;

    if (mongoDocument?._id) {
      updatedInjusticeType = await prisma.injusticeType.update({
        where: {
          InjusticeTypeID: injusticeType.InjusticeTypeID,
        },
        data: {
          MongoDocumentID: mongoDocument._id.toString(),
        },
      });
    }

    return res.status(201).json({
      message: "Injustice type created successfully",
      injusticeType: updatedInjusticeType,
      mongoDocumentId: mongoDocument?._id?.toString() ?? null,
    });
  } catch (error: any) {
    console.error("createInjusticeType error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Injustice type already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid createdBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateInjusticeType(req: Request, res: Response) {
  try {
    const injusticeTypeId = Number(req.params.injusticeTypeId);
    const { injusticeName, modifiedBy } = req.body;

    if (!Number.isInteger(injusticeTypeId) || injusticeTypeId <= 0) {
      return res.status(400).json({
        error: "Invalid injusticeTypeId",
      });
    }

    if (!injusticeName || typeof injusticeName !== "string" || injusticeName.trim() === "") {
      return res.status(400).json({
        error: "injusticeName is required",
      });
    }

    const injusticeType = await prisma.injusticeType.update({
      where: {
        InjusticeTypeID: injusticeTypeId,
      },
      data: {
        InjusticeName: injusticeName.trim(),
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    return res.status(200).json({
      message: "Injustice type updated successfully",
      injusticeType,
    });
  } catch (error: any) {
    console.error("updateInjusticeType error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Injustice type not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Injustice type already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid modifiedBy user",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteInjusticeType(req: Request, res: Response) {
  try {
    const injusticeTypeId = Number(req.params.injusticeTypeId);

    if (!Number.isInteger(injusticeTypeId) || injusticeTypeId <= 0) {
      return res.status(400).json({
        error: "Invalid injusticeTypeId",
      });
    }

    await prisma.injusticeType.delete({
      where: {
        InjusticeTypeID: injusticeTypeId,
      },
    });

    return res.status(200).json({
      message: "Injustice type deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteInjusticeType error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Injustice type not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this injustice type because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   ENTITY
========================= */

export async function getEntities(_req: Request, res: Response) {
  try {
    const entities = await prisma.entity.findMany({
      orderBy: {
        EntityID: "asc",
      },
      include: {
        CategoryEntity: true,
        IndustryType: true,
        Sector: true,
      },
    });

    return res.status(200).json(entities);
  } catch (error) {
    console.error("getEntities error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getEntityById(req: Request, res: Response) {
  try {
    const entityId = Number(req.params.entityId);

    if (!Number.isInteger(entityId) || entityId <= 0) {
      return res.status(400).json({
        error: "Invalid entityId",
      });
    }

    const entity = await prisma.entity.findUnique({
      where: {
        EntityID: entityId,
      },
      include: {
        CategoryEntity: true,
        IndustryType: true,
        Sector: true,
      },
    });

    if (!entity) {
      return res.status(404).json({
        error: "Entity not found",
      });
    }

    return res.status(200).json(entity);
  } catch (error) {
    console.error("getEntityById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createEntity(req: Request, res: Response) {
  try {
    const {
      entityName,
      description,
      categoryEntityId,
      industryTypeId,
      sectorId,
      createdBy,
    } = req.body;

    if (!entityName || typeof entityName !== "string" || entityName.trim() === "") {
      return res.status(400).json({
        error: "entityName is required",
      });
    }

    const parsedCategoryEntityId = Number(categoryEntityId);
    const parsedIndustryTypeId = Number(industryTypeId);
    const parsedSectorId = Number(sectorId);

    if (!Number.isInteger(parsedCategoryEntityId) || parsedCategoryEntityId <= 0) {
      return res.status(400).json({
        error: "valid categoryEntityId is required",
      });
    }

    if (!Number.isInteger(parsedIndustryTypeId) || parsedIndustryTypeId <= 0) {
      return res.status(400).json({
        error: "valid industryTypeId is required",
      });
    }

    if (!Number.isInteger(parsedSectorId) || parsedSectorId <= 0) {
      return res.status(400).json({
        error: "valid sectorId is required",
      });
    }

    const entity = await prisma.entity.create({
      data: {
        EntityName: entityName.trim(),
        Description:
          typeof description === "string" && description.trim() !== ""
            ? description.trim()
            : null,
        NumberBoycotts: 0,
        CategoryEntityID: parsedCategoryEntityId,
        IndustryTypeID: parsedIndustryTypeId,
        SectorID: parsedSectorId,
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    const mongoDocument = await createOrUpdateEntityDocument(
      entity.EntityID,
      entity.EntityName,
    );

    let updatedEntity = entity;

    if (mongoDocument?._id) {
      updatedEntity = await prisma.entity.update({
        where: {
          EntityID: entity.EntityID,
        },
        data: {
          MongoDocumentID: mongoDocument._id.toString(),
        },
      });
    }

    return res.status(201).json({
      message: "Entity created successfully",
      entity: updatedEntity,
      mongoDocumentId: mongoDocument?._id?.toString() ?? null,
    });
  } catch (error: any) {
    console.error("createEntity error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Entity already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid foreign key value",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateEntity(req: Request, res: Response) {
  try {
    const entityId = Number(req.params.entityId);

    if (!Number.isInteger(entityId) || entityId <= 0) {
      return res.status(400).json({
        error: "Invalid entityId",
      });
    }

    const currentEntity = await prisma.entity.findUnique({
      where: {
        EntityID: entityId,
      },
    });

    if (!currentEntity) {
      return res.status(404).json({
        error: "Entity not found",
      });
    }

    const {
      entityName,
      description,
      categoryEntityId,
      industryTypeId,
      sectorId,
      modifiedBy,
    } = req.body;

    const parsedCategoryEntityId =
      categoryEntityId !== undefined
        ? Number(categoryEntityId)
        : currentEntity.CategoryEntityID;

    const parsedIndustryTypeId =
      industryTypeId !== undefined
        ? Number(industryTypeId)
        : currentEntity.IndustryTypeID;

    const parsedSectorId =
      sectorId !== undefined
        ? Number(sectorId)
        : currentEntity.SectorID;

    if (!Number.isInteger(parsedCategoryEntityId) || parsedCategoryEntityId <= 0) {
      return res.status(400).json({
        error: "valid categoryEntityId is required",
      });
    }

    if (!Number.isInteger(parsedIndustryTypeId) || parsedIndustryTypeId <= 0) {
      return res.status(400).json({
        error: "valid industryTypeId is required",
      });
    }

    if (!Number.isInteger(parsedSectorId) || parsedSectorId <= 0) {
      return res.status(400).json({
        error: "valid sectorId is required",
      });
    }

    const updatedEntity = await prisma.entity.update({
      where: {
        EntityID: entityId,
      },
      data: {
        EntityName:
          typeof entityName === "string" && entityName.trim() !== ""
            ? entityName.trim()
            : currentEntity.EntityName,
        Description:
          description !== undefined
            ? typeof description === "string" && description.trim() !== ""
              ? description.trim()
              : null
            : currentEntity.Description,
        CategoryEntityID: parsedCategoryEntityId,
        IndustryTypeID: parsedIndustryTypeId,
        SectorID: parsedSectorId,
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    const mongoDocument = await createOrUpdateEntityDocument(
      updatedEntity.EntityID,
      updatedEntity.EntityName,
    );

    let finalEntity = updatedEntity;

    if (
      mongoDocument?._id &&
      updatedEntity.MongoDocumentID !== mongoDocument._id.toString()
    ) {
      finalEntity = await prisma.entity.update({
        where: {
          EntityID: updatedEntity.EntityID,
        },
        data: {
          MongoDocumentID: mongoDocument._id.toString(),
        },
      });
    }

    return res.status(200).json({
      message: "Entity updated successfully",
      entity: finalEntity,
      mongoDocumentId:
        mongoDocument?._id?.toString() ?? finalEntity.MongoDocumentID,
    });
  } catch (error: any) {
    console.error("updateEntity error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Entity not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Entity already exists",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Invalid foreign key value",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteEntity(req: Request, res: Response) {
  try {
    const entityId = Number(req.params.entityId);

    if (!Number.isInteger(entityId) || entityId <= 0) {
      return res.status(400).json({
        error: "Invalid entityId",
      });
    }

    await prisma.entity.delete({
      where: {
        EntityID: entityId,
      },
    });

    return res.status(200).json({
      message: "Entity deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteEntity error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Entity not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this entity because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   SECTOR
========================= */

export async function getSectors(_req: Request, res: Response) {
  try {
    const sectors = await prisma.sector.findMany({
      orderBy: {
        SectorID: "asc",
      },
    });

    return res.status(200).json(sectors);
  } catch (error) {
    console.error("getSectors error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getSectorById(req: Request, res: Response) {
  try {
    const sectorId = Number(req.params.sectorId);

    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Invalid sectorId",
      });
    }

    const sector = await prisma.sector.findUnique({
      where: {
        SectorID: sectorId,
      },
    });

    if (!sector) {
      return res.status(404).json({
        error: "Sector not found",
      });
    }

    return res.status(200).json(sector);
  } catch (error) {
    console.error("getSectorById error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function createSector(req: Request, res: Response) {
  try {
    const { sectorName, createdBy } = req.body;

    if (!sectorName || typeof sectorName !== "string" || sectorName.trim() === "") {
      return res.status(400).json({
        error: "sectorName is required",
      });
    }

    const sector = await prisma.sector.create({
      data: {
        SectorName: sectorName.trim(),
        CreatedBy: createdBy ? Number(createdBy) : null,
      },
    });

    return res.status(201).json({
      message: "Sector created successfully",
      sector,
    });
  } catch (error: any) {
    console.error("createSector error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Sector already exists",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateSector(req: Request, res: Response) {
  try {
    const sectorId = Number(req.params.sectorId);
    const { sectorName, modifiedBy } = req.body;

    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Invalid sectorId",
      });
    }

    if (!sectorName || typeof sectorName !== "string" || sectorName.trim() === "") {
      return res.status(400).json({
        error: "sectorName is required",
      });
    }

    const sector = await prisma.sector.update({
      where: {
        SectorID: sectorId,
      },
      data: {
        SectorName: sectorName.trim(),
        ModifiedAt: new Date(),
        ModifiedBy: modifiedBy ? Number(modifiedBy) : null,
      },
    });

    return res.status(200).json({
      message: "Sector updated successfully",
      sector,
    });
  } catch (error: any) {
    console.error("updateSector error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Sector not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Sector already exists",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteSector(req: Request, res: Response) {
  try {
    const sectorId = Number(req.params.sectorId);

    if (!Number.isInteger(sectorId) || sectorId <= 0) {
      return res.status(400).json({
        error: "Invalid sectorId",
      });
    }

    await prisma.sector.delete({
      where: {
        SectorID: sectorId,
      },
    });

    return res.status(200).json({
      message: "Sector deleted successfully",
    });
  } catch (error: any) {
    console.error("deleteSector error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Sector not found",
      });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete this sector because it is being used",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

/* =========================
   INDUSTRY TYPE
========================= */

export async function getIndustryTypes(_req: Request, res: Response) {
  try {
    const industryTypes = await prisma.industryType.findMany({
      orderBy: {
        IndustryTypeID: "asc",
      },
    });

    return res.status(200).json(industryTypes);
  } catch (error) {
    console.error("getIndustryTypes error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}