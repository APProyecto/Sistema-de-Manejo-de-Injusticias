import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { getBoycottDocumentByMysqlId } from "../../../../m0-base-datos/src/services/mongoDocuments.service";

/*
  Function: getAuditPublications.
  Inputs: injusticeTypeId, dateFrom, dateTo, countryId, author, indicted, orderByVotes (query params).
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
      author,
      indicted,
      orderByVotes = "inFavor", // Opciones: "inFavor", "against", o "desc" para descendente
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

    if (author) {
      where.AppUser_Boycott_CreatorIDToAppUser = {
        UserName: { contains: author as string },
      };
    }

    if (indicted) {
      where.Entity = {
        EntityName: { contains: indicted as string },
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
        //NumberReports: true,
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
      orderBy:
        orderByVotes === "against"
          ? { VotesAgainst: "desc" }
          : { VotesInFavor: "desc" },
    });

    const enrichedData = await Promise.all(
      boycotts.map(async (b) => {
        const mongoDoc = await getBoycottDocumentByMysqlId(b.BoycottID);

        return {
          boycottId: b.BoycottID,
          title: b.Title,
          author: b.AppUser_Boycott_CreatorIDToAppUser?.UserName,
          indicted: b.Entity?.EntityName,
          injusticeCategory: b.InjusticeType?.InjusticeName,
          date: b.PublicationDate,
          country: b.Country?.CountryName,
          votesInFavor: b.VotesInFavor,
          votesAgainst: b.VotesAgainst,
          //numberReports: b.NumberReports,
          status: b.BoycottState?.StateName,
          filesCount: mongoDoc?.filesNumber ?? 0,
        };
      }),
    );

    return res.json({
      total: boycotts.length,
      data: enrichedData,
    });
  } catch (error) {
    console.error("getAuditPublications error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFilterOptions(req: Request, res: Response) {
  try {
    const [entities, injusticeTypes, countries] = await Promise.all([
      prisma.entity.findMany({
        select: { EntityID: true, EntityName: true },
        orderBy: { EntityName: "asc" },
      }),
      prisma.injusticeType.findMany({
        select: { InjusticeTypeID: true, InjusticeName: true },
        orderBy: { InjusticeName: "asc" },
      }),
      prisma.country.findMany({
        select: { CountryID: true, CountryName: true },
        orderBy: { CountryName: "asc" },
      }),
    ]);

    return res.json({
      data: { entities, injusticeTypes, countries },
    });
  } catch (error) {
    console.error("getFilterOptions error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
