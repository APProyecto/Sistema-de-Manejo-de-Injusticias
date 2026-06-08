import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

import { downloadFileFromGridFS } from "../../../../m0-base-datos/src/services/gridfs.service";

import {
  getEntityDocumentByEntityId,
  getAppUserDocumentByUserId,
  getBoycottDocumentByMysqlId,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

/*
    Function: getMostFollowedCases.
    Inputs: Request object containing indictedFilter and injusticeFilter in the body. Default values for indictedFilter and injusticeFilter are "Category".
    Description: get the most followed cases in the app.
    Outputs: JSON response with a list of cases or an error message.
*/
export async function getMostFollowedCases(req: Request, res: Response) {
  try {
    const { indictedFilter, injusticeFilter } = req.body;

    const followersCount = await prisma.userFavoriteBoycott.groupBy({
      by: ["BoycottID"],
      _count: {
        _all: true,
      },
    });

    const FindCases = await prisma.boycott.findMany({
      distinct: ["BoycottID"],
      where: {
        InjusticeType: {
          ...(injusticeFilter !== "Category"
            ? { InjusticeName: injusticeFilter }
            : {}),
        },
        Entity: {
          CategoryEntity: {
            ...(indictedFilter !== "Category"
              ? { CategoryName: indictedFilter }
              : {}),
          },
        },
      },
      select: {
        BoycottID: true,
        InjusticeType: {
          select: {
            InjusticeName: true,
          },
        },
        Entity: {
          select: {
            EntityID: true,
            EntityName: true,
          },
        },
      },
    });

    const summary = [];
    for (let i = 0; i < followersCount.length; i++) {
      for (let j = 0; j < FindCases.length; j++) {
        if (followersCount[i].BoycottID == FindCases[j].BoycottID) {
          let element = {
            entityname: FindCases[j].Entity.EntityName,
            entityPicture: getEntityPicture(FindCases[j].Entity.EntityID),
            injusticeType: FindCases[j].InjusticeType.InjusticeName,
            followers: followersCount[i]._count,
          };
          summary.push(element);
        }
      }
    }

    res.json({
      ok: true,
      mostFollowed: summary,
    });
  } catch (error) {
    console.error("getMostFollowedCases error:", error);

    res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

async function getEntityPicture(entId: number) {
  try {
    const CurrentMongoDocument = await getEntityDocumentByEntityId(entId);

    if (!CurrentMongoDocument?.picture?.mongoFileId) {
      console.error("getEntityPicture picture not found");
      return null;
    }

    const fileBuffer = await downloadFileFromGridFS(
      CurrentMongoDocument.picture.mongoFileId.toString(),
    );

    return fileBuffer;
  } catch (error) {
    console.error("getEntityPicture error:", error);
    return null;
  }
}

async function getAppUserPicture(userId: number) {
  try {
    const CurrentMongoDocument = await getAppUserDocumentByUserId(userId);

    if (!CurrentMongoDocument?.picture?.mongoFileId) {
      console.error("getAppUserPicture picture not found");
      return null;
    }

    const fileBuffer = await downloadFileFromGridFS(
      CurrentMongoDocument.picture.mongoFileId.toString(),
    );

    return fileBuffer;
  } catch (error) {
    console.error("getAppUserPicture error:", error);
    return null;
  }
}

async function getBoycottDesc(boycottId: number) {
  try {
    const CurrentMongoDocument = await getBoycottDocumentByMysqlId(boycottId);

    if (!CurrentMongoDocument?.description) {
      console.error("getBoycottDesc description not found");
      return null;
    }

    const description = CurrentMongoDocument.description;

    return description;
  } catch (error) {
    console.error("getBoycottDesc error:", error);
    return null;
  }
}

/*
    Function: getUserPostAndComments.
    Inputs: Request object containing the userName and Categoryfilter in the body. Defalut value for CategoryFilter is "Category".
    Description: get the users post, comments in other users post and the entities it follows.
    Outputs: JSON response with the username,a list of post with title, description and state of the boycott; a list of comments with description, 
    title and the user name creator of the boycott; and a list of entities or an error message.
*/

export async function getUserPostAndComments(req: Request, res: Response) {
  try {
    const { userName, CategoryFilter } = req.body;

    const userId = await prisma.appUser.findFirst({
      where: {
        UserName: userName,
      },
      select: {
        UserID: true,
      },
    });

    const AppUserPicture = getAppUserPicture(Number(userId));

    const UserPost = await prisma.boycott.findMany({
      where: {
        CreatorID: userId?.UserID,
        InjusticeType: {
          ...(CategoryFilter !== "Category"
            ? { InjusticeName: CategoryFilter }
            : {}),
        },
      },
      select: {
        Title: true,
        BoycottID: true,
        BoycottState: {
          select: {
            StateName: true,
          },
        },
      },
    });

    const enrichPost = [];

    for (let i = 0; i < UserPost.length; i++) {
      let post = {
        Title: UserPost[i].Title,
        State: UserPost[i].BoycottState.StateName,
        Description: getBoycottDesc(UserPost[i].BoycottID),
      };
      enrichPost.push(post);
    }

    const UserComments = await prisma.commentBoycott.findMany({
      where: {
        CreatorID: userId?.UserID,
        Boycott: {
          InjusticeType: {
            ...(CategoryFilter !== "Category"
              ? { InjusticeName: CategoryFilter }
              : {}),
          },
        },
      },
      select: {
        Description: true,
        Boycott: {
          select: {
            Title: true,
            AppUser_Boycott_CreatorIDToAppUser: {
              select: {
                UserName: true,
              },
            },
          },
        },
      },
    });

    const flatComments = [];

    for (let i = 0; i < UserComments.length; i++) {
      let comment = {
        Title: UserComments[i].Boycott.Title,
        User: UserComments[i].Boycott.AppUser_Boycott_CreatorIDToAppUser
          .UserName,
        Description: UserComments[i].Description,
      };
      flatComments.push(comment);
    }

    const entityFollowing = await prisma.userFavoriteBoycott.findMany({
      where: {
        UserID: userId?.UserID,
      },
      select: {
        Boycott: {
          select: {
            Entity: {
              select: {
                EntityID: true,
                EntityName: true,
              },
            },
          },
        },
      },
    });

    const enrichEntities = [];

    for (let i = 0; i < entityFollowing.length; i++) {
      let entity = {
        EntityName: entityFollowing[i].Boycott.Entity.EntityName,
        EntityPicture: getEntityPicture(
          entityFollowing[i].Boycott.Entity.EntityID,
        ),
      };
      enrichEntities.push(entity);
    }

    res.json({
      ok: true,
      username: userName,
      userPicture: AppUserPicture,
      posts: enrichPost,
      Comments: flatComments,
      Follows: enrichEntities,
    });
  } catch (error) {
    console.error("getMostFollowedCases error:", error);

    res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

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
