import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

import {
  getBoycottDocumentByMysqlId,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

/*
    Function: getMostFollowedCases.
    Inputs: Request object containing indictedFilter and injusticeFilter in the query. Default values for indictedFilter and injusticeFilter are "Category".
    Description: get the most followed cases in the app.
    Outputs: JSON response with a list of cases or an error message.
*/
export async function getMostFollowedCases(req: Request, res: Response) {
  try {
    const indictedFilter = req.query.indictedFilter?.toString();
    const injusticeFilter = req.query.injusticeFilter?.toString();

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
            CategoryEntity: {
              select: {
                CategoryName: true,
              },
            },
          },
        },
      },
    });

    const summary = [];

    for (let i = 0; i < followersCount.length; i++) {
      for (let j = 0; j < FindCases.length; j++) {
        if (followersCount[i].BoycottID == FindCases[j].BoycottID) {
        const element = {
          EntityID: FindCases[j].Entity.EntityID,
          entityname: FindCases[j].Entity.EntityName,

          // Se deja null para evitar importar funciones del frontend en M4.
          entityPicture: null,

          entityType: FindCases[j].Entity.CategoryEntity.CategoryName,
          injusticeType: FindCases[j].InjusticeType.InjusticeName,
          followers: followersCount[i]._count._all,
        };

          summary.push(element);
        }
      }
    }

    return res.json({
      ok: true,
      mostFollowed: [...summary].sort((a, b) => b.followers - a.followers),
    });
  } catch (error) {
    console.error("getMostFollowedCases error:", error);

    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

async function getBoycottDesc(boycottId: number) {
  try {
    const CurrentMongoDocument = await getBoycottDocumentByMysqlId(boycottId);

    const description = CurrentMongoDocument?.description.toString() ?? "";

    return description;
  } catch (error) {
    console.error("getBoycottDesc error:", error);
    return null;
  }
}

/*
    Function: getUserPostAndComments.
    Inputs: Request object containing the userName and Categoryfilter in the query. Defalut value for CategoryFilter is "Category".
    Description: get the users post, comments in other users post and the entities it follows.
    Outputs: JSON response with the username,a list of post with title, description and state of the boycott; a list of comments with description, 
    title and the user name creator of the boycott; and a list of entities or an error message.
*/

export async function getUserPostAndComments(req: Request, res: Response) {
  try {
    const userName = req.query.userName?.toString();
    const CategoryFilter = req.query.CategoryFilter?.toString();

    const userId = await prisma.appUser.findFirst({
      where: {
        UserName: userName,
      },
      select: {
        UserID: true,
      },
    });

    // Se deja null para evitar importar funciones del frontend en M4.
    const AppUserPicture = null;

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
      const desc = await getBoycottDesc(UserPost[i].BoycottID);

      const post = {
        Title: UserPost[i].Title,
        State: UserPost[i].BoycottState.StateName,
        Description: desc,
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
      const comment = {
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
            BoycottID: true,
            Entity: {
              select: {
                EntityName: true,
              },
            },
          },
        },
      },
    });

    interface entityInter {
      EntityName: string;
      EntityPicture: string | null;
    }

    const enrichEntities: entityInter[] = [];

    for (let i = 0; i < entityFollowing.length; i++) {
      const entity = {
        EntityName: entityFollowing[i].Boycott.Entity.EntityName,

        // Se deja null para evitar importar funciones del frontend en M4.
        EntityPicture: null,
      };

      if (
        !enrichEntities.some(
          (InEntity) => InEntity.EntityName === entity.EntityName,
        )
      ) {
        enrichEntities.push(entity);
      }
    }

    return res.json({
      ok: true,
      username: userName,
      userPicture: AppUserPicture,
      posts: enrichPost,
      Comments: flatComments,
      Follows: enrichEntities,
    });
  } catch (error) {
    console.error("getUserPostAndComments error:", error);

    return res.status(500).json({
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
    const { indicted, entityId, dateFrom, dateTo, status } = req.query;

    const where: any = {};

    if (indicted) {
      where.Entity = {
        EntityName: { contains: indicted as string },
      };
    }

    if (entityId) {
      where.EntityID = Number(entityId);
    } else if (indicted) {
      where.Entity = {
        EntityName: { contains: indicted as string },
      };
    }

    if (dateFrom || dateTo) {
      where.PublicationDate = {};

      if (dateFrom) {
        where.PublicationDate.gte = new Date(dateFrom as string);
      }

      if (dateTo) {
        where.PublicationDate.lte = new Date(dateTo as string);
      }
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
          select: {
            UserName: true,
            UserID: true,
          },
        },
        Entity: {
          select: {
            EntityID: true,
            EntityName: true,
            // MongoDocumentID: true,
          },
        },
        BoycottState: {
          select: {
            StateName: true,
          },
        },
      },
      orderBy: {
        Entity: {
          EntityName: "asc",
        },
      },
    });

    const grouped: any = {};

    for (const boycott of boycotts) {
      const currentEntityId = boycott.Entity.EntityID;

      if (!grouped[currentEntityId]) {
        grouped[currentEntityId] = {
          entityId: currentEntityId,
          entityName: boycott.Entity.EntityName,
          // mongoDocumentId: boycott.Entity.MongoDocumentID,
          boycotts: [],
        };
      }

      // const mongoDoc = await getBoycottDocumentByMysqlId(boycott.BoycottID);

      grouped[currentEntityId].boycotts.push({
        boycottId: boycott.BoycottID,
        title: boycott.Title,
        // description: mongoDoc?.description ?? null,
        author: boycott.AppUser_Boycott_CreatorIDToAppUser?.UserName,
        authorId: boycott.AppUser_Boycott_CreatorIDToAppUser?.UserID,
        date: boycott.PublicationDate,
        status: boycott.BoycottState?.StateName,
      });
    }

    return res.json({
      total: boycotts.length,
      data: Object.values(grouped),
    });
  } catch (error) {
    console.error("getByEntity error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}