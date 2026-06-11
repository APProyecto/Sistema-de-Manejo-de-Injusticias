import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

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

    if (!injusticeName || typeof injusticeName !== "string" || injusticeName.trim() === "") {
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

    return res.status(201).json({
      message: "Injustice type created successfully",
      injusticeType,
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
