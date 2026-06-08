import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

/*
  Function: getAuditPublications.
  Inputs: injusticeTypeId, dateFrom, dateTo, countryId, orderByVotes (query params).
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

    // NOTA: CheckedBy (campo "check o equis") - Pendiente de aclaración

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
