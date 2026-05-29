import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

/*
  Function: getByEntity.
  Inputs: indicted, dateFrom, dateTo, status (query params).
  Description: Returns all boycotts grouped by entity. Supports partial date ranges:
               if only dateFrom is provided the range goes from that date to today,
               if only dateTo is provided it covers all dates up to that point.
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
            MongoDocumentID: true,
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
          mongoDocumentId: boycott.Entity.MongoDocumentID,
          boycotts: [],
        };
      }

      acc[entityId].boycotts.push({
        boycottId: boycott.BoycottID,
        title: boycott.Title,
        // PENDIENTE: la descripción del boycott no está disponible en MySQL.
        // Se implementa cuando se defina dónde se almacena ese campo.
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
