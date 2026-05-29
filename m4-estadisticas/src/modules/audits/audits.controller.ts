import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

/*
  Function: getAuditPublications.
  Inputs: injusticeTypeId, dateFrom, dateTo, countryId, continentId, orderByVotes (query params).
  Description: Returns a filtered and sortable list of boycott publications for content auditing.
  Outputs: JSON with total records and publication list.
*/
export async function getAuditPublications(req: Request, res: Response) {
  try {
    const {
      injusticeTypeId,
      dateFrom,
      dateTo,
      countryId,
      continentId,
      orderByVotes = "desc",
    } = req.query;

    const where: any = {};

    if (injusticeTypeId) {
      where.InjusticeTypeID = Number(injusticeTypeId);
    }

    if (dateFrom || dateTo) {
      where.PublicationDate = {};
      if (dateFrom) where.PublicationDate.gte = new Date(dateFrom as string);
      if (dateTo) where.PublicationDate.lte = new Date(dateTo as string);
    }

    if (countryId) {
      where.CountryID = Number(countryId);
    }

    if (continentId) {
      where.Country = {
        ContinentID: Number(continentId),
      };
    }

    const boycotts = await prisma.boycott.findMany({
      where,
      select: {
        BoycottID: true,
        Title: true,
        PublicationDate: true,
        VotesInFavor: true,
        VotesAgainst: true,
        NumberReports: true,
        AppUser_Boycott_CreatorIDToAppUser: {
          select: { UserName: true },
        },
        Entity: {
          select: { EntityName: true },
        },
        InjusticeType: {
          select: { InjusticeName: true },
        },
        Country: {
          select: { CountryName: true },
        },
        BoycottState: {
          select: { StateName: true },
        },
      },
      orderBy: {
        VotesInFavor: orderByVotes === "asc" ? "asc" : "desc",
      },
    });

    // PENDIENTE: el conteo de archivos adjuntos por publicación se obtiene desde MongoDB
    // usando MongoDocumentId. Se implementa cuando MongoDB esté configurado en el proyecto.

    return res.json({
      total: boycotts.length,
      data: boycotts.map((b) => ({
        boycottId: b.BoycottID,
        title: b.Title,
        author: b.AppUser_Boycott_CreatorIDToAppUser?.UserName,
        indicted: b.Entity?.EntityName,
        injusticeCategory: b.InjusticeType?.InjusticeName,
        date: b.PublicationDate,
        country: b.Country?.CountryName,
        votesInFavor: b.VotesInFavor,
        votesAgainst: b.VotesAgainst,
        numberReports: b.NumberReports,
        status: b.BoycottState?.StateName,
      })),
    });
  } catch (error) {
    console.error("getAuditPublications error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/*
  Function: getByEntity.
  Inputs: indicted, dateFrom, dateTo, status (query params).
  Description: Returns all boycotts grouped by entity. Supports partial date ranges and status filtering.
  Outputs: JSON with total records and boycotts nested under each entity.
*/
export async function getByEntity(req: Request, res: Response) {
  try {
    const { indicted, dateFrom, dateTo, status } = req.query;

    const where: any = {};

    if (indicted) {
      where.Entity = {
        EntityName: { contains: indicted as string },
      };
    }

    if (dateFrom || dateTo) {
      where.PublicationDate = {};
      if (dateFrom) where.PublicationDate.gte = new Date(dateFrom as string);
      if (dateTo) where.PublicationDate.lte = new Date(dateTo as string);
    }

    if (status) {
      where.BoycottState = {
        StateName: status as string,
      };
    }

    // PENDIENTE: la descripción del boycott se almacena en MongoDB via MongoDocumentId.
    // Se implementa cuando MongoDB esté configurado en el proyecto.

    const boycotts = await prisma.boycott.findMany({
      where,
      select: {
        BoycottID: true,
        Title: true,
        PublicationDate: true,
        AppUser_Boycott_CreatorIDToAppUser: {
          select: { UserName: true },
        },
        Entity: {
          select: {
            EntityID: true,
            EntityName: true,
          },
        },
        BoycottState: {
          select: { StateName: true },
        },
      },
      orderBy: {
        Entity: { EntityName: "asc" },
      },
    });

    const grouped = boycotts.reduce((acc: any, boycott) => {
      const entityId = boycott.Entity.EntityID;

      if (!acc[entityId]) {
        acc[entityId] = {
          entityId,
          entityName: boycott.Entity.EntityName,
          boycotts: [],
        };
      }

      acc[entityId].boycotts.push({
        boycottId: boycott.BoycottID,
        title: boycott.Title,
        author: boycott.AppUser_Boycott_CreatorIDToAppUser?.UserName,
        date: boycott.PublicationDate,
        status: boycott.BoycottState?.StateName,
      });

      return acc;
    }, {});

    return res.json({
      total: boycotts.length,
      data: Object.values(grouped),
    });
  } catch (error) {
    console.error("getByEntity error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
