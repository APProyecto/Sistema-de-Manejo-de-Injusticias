import { prisma } from "../../config/prisma";
import {
  createOrUpdateBoycottDocument,
  getBoycottDocumentByMysqlId,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";
import type { BoycottDocument } from "../../../../m0-base-datos/src/types/mongoDocuments";

const MAX_PAGE_SIZE = 50;

export type AdminBoycottSort = "created" | "relevance" | "activity";

export type AdminBoycottListParams = {
  page: number;
  size: number;
  sort: AdminBoycottSort;
  includeDeleted: boolean;
  q?: string;
  stateId?: number;
  state?: string;
  creatorId?: number;
  checkedBy?: number;
  countryId?: number;
  injusticeTypeId?: number;
  entityId?: number;
};

export type AdminBoycottCreateInput = {
  title: string;
  description: string;
  creatorId: number;
  creatorUsername?: string;
  entityId: number;
  countryId: number;
  injusticeTypeId: number;
  boycottStateId: number;
  caseNumber?: number;
};

export type BoycottAttachment = {
  id: string;
  name: string;
  type?: string;
  size?: number;
};

const adminBoycottSelect = {
  BoycottID: true,
  Title: true,
  CaseNumber: true,
  PublicationDate: true,
  CreatedAt: true,
  LastUpdateDate: true,
  LastCheckDate: true,
  VotesInFavor: true,
  VotesAgainst: true,
  NumberFavorites: true,
  NumberComments: true,
  NumberReports: true,
  MongoDocumentId: true,
  DeletedByUser: true,
  DeletedAt: true,
  CreatedBy: true,
  ModifiedBy: true,
  CheckedBy: true,
  CreatorID: true,
  BoycottState: {
    select: {
      BoycottStateID: true,
      StateName: true,
    },
  },
  Country: {
    select: {
      CountryID: true,
      CountryName: true,
    },
  },
  InjusticeType: {
    select: {
      InjusticeTypeID: true,
      InjusticeName: true,
    },
  },
  Entity: {
    select: {
      EntityID: true,
      EntityName: true,
      Description: true,
      CategoryEntity: {
        select: {
          CategoryEntityID: true,
          CategoryName: true,
        },
      },
      IndustryType: {
        select: {
          IndustryTypeID: true,
          IndustryName: true,
        },
      },
      Sector: {
        select: {
          SectorID: true,
          SectorName: true,
        },
      },
    },
  },
} as const;

function clampPageSize(size: number) {
  return Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
}

function buildOrderBy(sort: AdminBoycottSort) {
  if (sort === "activity") {
    return [{ NumberReports: "desc" }, { NumberComments: "desc" }];
  }

  if (sort === "relevance") {
    return [{ NumberFavorites: "desc" }, { VotesInFavor: "desc" }];
  }

  return [{ CreatedAt: "desc" }];
}

function buildWhere(params: AdminBoycottListParams) {
  const where: any = {
    DeletedByUser: params.includeDeleted ? undefined : false,
  };

  if (params.stateId) {
    where.BoycottStateID = params.stateId;
  }

  if (params.state) {
    where.BoycottState = {
      ...(where.BoycottState ?? {}),
      StateName: params.state,
    };
  }

  if (params.creatorId) {
    where.CreatorID = params.creatorId;
  }

  if (params.checkedBy) {
    where.CheckedBy = params.checkedBy;
  }

  if (params.countryId) {
    where.CountryID = params.countryId;
  }

  if (params.injusticeTypeId) {
    where.InjusticeTypeID = params.injusticeTypeId;
  }

  if (params.entityId) {
    where.EntityID = params.entityId;
  }

  if (params.q) {
    where.OR = [
      { Title: { contains: params.q } },
      {
        Entity: {
          EntityName: { contains: params.q },
        },
      },
      {
        Country: {
          CountryName: { contains: params.q },
        },
      },
      {
        InjusticeType: {
          InjusticeName: { contains: params.q },
        },
      },
    ];
  }

  return where;
}

function mapAdminBoycottSummary(boycott: any) {
  return {
    id: boycott.BoycottID,
    title: boycott.Title,
    caseNumber: boycott.CaseNumber,
    publicationDate: boycott.PublicationDate,
    createdAt: boycott.CreatedAt,
    lastUpdateDate: boycott.LastUpdateDate,
    lastCheckDate: boycott.LastCheckDate,
    votesInFavor: boycott.VotesInFavor,
    votesAgainst: boycott.VotesAgainst,
    favorites: boycott.NumberFavorites,
    comments: boycott.NumberComments,
    reports: boycott.NumberReports,
    mongoDocumentId: boycott.MongoDocumentId,
    deletedByUser: boycott.DeletedByUser,
    deletedAt: boycott.DeletedAt,
    createdBy: boycott.CreatedBy,
    modifiedBy: boycott.ModifiedBy,
    checkedBy: boycott.CheckedBy,
    creatorId: boycott.CreatorID,
    state: boycott.BoycottState
      ? {
          id: boycott.BoycottState.BoycottStateID,
          name: boycott.BoycottState.StateName,
        }
      : null,
    country: boycott.Country
      ? {
          id: boycott.Country.CountryID,
          name: boycott.Country.CountryName,
        }
      : null,
    injusticeType: boycott.InjusticeType
      ? {
          id: boycott.InjusticeType.InjusticeTypeID,
          name: boycott.InjusticeType.InjusticeName,
        }
      : null,
    entity: boycott.Entity
      ? {
          id: boycott.Entity.EntityID,
          name: boycott.Entity.EntityName,
          description: boycott.Entity.Description,
          category: boycott.Entity.CategoryEntity
            ? {
                id: boycott.Entity.CategoryEntity.CategoryEntityID,
                name: boycott.Entity.CategoryEntity.CategoryName,
              }
            : null,
          industryType: boycott.Entity.IndustryType
            ? {
                id: boycott.Entity.IndustryType.IndustryTypeID,
                name: boycott.Entity.IndustryType.IndustryName,
              }
            : null,
          sector: boycott.Entity.Sector
            ? {
                id: boycott.Entity.Sector.SectorID,
                name: boycott.Entity.Sector.SectorName,
              }
            : null,
        }
      : null,
  };
}

function mapAttachments(document: BoycottDocument | null) {
  if (!document?.evidence?.length) {
    return [] as BoycottAttachment[];
  }

  return document.evidence
    .filter((item) => Boolean(item.fileName))
    .map((item) => ({
      id: String(item.mongoFileId ?? item.gridFsId ?? ""),
      name: item.fileName,
      type: item.contentType,
      size: item.fileSize,
    }))
    .filter((item) => item.id.length > 0);
}

export async function listAdminBoycotts(params: AdminBoycottListParams) {
  const size = clampPageSize(params.size);
  const page = Math.max(params.page, 1);
  const skip = (page - 1) * size;
  const where = buildWhere(params);

  const [items, total] = await prisma.$transaction([
    prisma.boycott.findMany({
      where,
      take: size,
      skip,
      orderBy: buildOrderBy(params.sort),
      select: adminBoycottSelect,
    }),
    prisma.boycott.count({ where }),
  ]);

  return {
    data: items.map(mapAdminBoycottSummary),
    total,
    page,
    size,
  };
}

export async function getAdminBoycottDetail(boycottId: number) {
  const boycott = await prisma.boycott.findUnique({
    where: { BoycottID: boycottId },
    select: adminBoycottSelect,
  });

  if (!boycott) {
    return null;
  }

  const document = await getBoycottDocumentByMysqlId(boycottId);

  return {
    ...mapAdminBoycottSummary(boycott),
    mongo: document
      ? {
          description: document.description,
          creatorUsername: document.creatorUsername,
          entityDescription: document.entityDescription,
          filesNumber: document.filesNumber,
          evidence: mapAttachments(document),
          lastUpdateDate: document.lastUpdateDate,
        }
      : null,
  };
}

export async function listAdminBoycottAttachments(boycottId: number) {
  const document = await getBoycottDocumentByMysqlId(boycottId);

  return mapAttachments(document);
}

export async function createAdminBoycott(input: AdminBoycottCreateInput) {
  const boycott = await prisma.boycott.create({
    data: {
      Title: input.title,
      CaseNumber: input.caseNumber ?? null,
      CreatorID: input.creatorId,
      BoycottStateID: input.boycottStateId,
      CountryID: input.countryId,
      InjusticeTypeID: input.injusticeTypeId,
      EntityID: input.entityId,
      CreatedBy: input.creatorId,
    },
    select: {
      BoycottID: true,
      Title: true,
      CaseNumber: true,
      PublicationDate: true,
      CreatorID: true,
      BoycottState: {
        select: { BoycottStateID: true, StateName: true },
      },
      Country: {
        select: { CountryID: true, CountryName: true },
      },
      InjusticeType: {
        select: { InjusticeTypeID: true, InjusticeName: true },
      },
      Entity: {
        select: {
          EntityID: true,
          EntityName: true,
          Description: true,
          CategoryEntity: {
            select: { CategoryEntityID: true, CategoryName: true },
          },
        },
      },
    },
  });

  const document: BoycottDocument = {
    mysqlid: boycott.BoycottID,
    title: boycott.Title,
    description: input.description,
    creatorId: boycott.CreatorID,
    creatorUsername: input.creatorUsername ?? "",
    entityId: boycott.Entity.EntityID,
    entityName: boycott.Entity.EntityName,
    entityDescription: boycott.Entity.Description ?? undefined,
    countryId: boycott.Country.CountryID,
    countryName: boycott.Country.CountryName,
    injusticeTypeId: boycott.InjusticeType.InjusticeTypeID,
    injusticeTypeName: boycott.InjusticeType.InjusticeName,
    categoryId: boycott.Entity.CategoryEntity?.CategoryEntityID ?? 0,
    categoryName: boycott.Entity.CategoryEntity?.CategoryName ?? "",
    caseNumber: boycott.CaseNumber ?? undefined,
    filesNumber: 0,
    publicationDate: boycott.PublicationDate,
    lastUpdateDate: boycott.PublicationDate,
    evidence: [],
  };

  const mongoDoc = await createOrUpdateBoycottDocument(document);

  if (mongoDoc?._id) {
    await prisma.boycott.update({
      where: { BoycottID: boycott.BoycottID },
      data: { MongoDocumentId: mongoDoc._id.toString() },
    });
  }

  return {
    boycottId: boycott.BoycottID,
    mongoDocumentId: mongoDoc?._id?.toString() ?? null,
  };
}

export async function listAdminBoycottsByCreator(creatorId: number) {
  return listAdminBoycotts({
    page: 1,
    size: MAX_PAGE_SIZE,
    sort: "created",
    includeDeleted: true,
    creatorId,
  });
}

export async function listAdminFavorites(userId: number) {
  const favorites = await prisma.userFavoriteBoycott.findMany({
    where: { UserID: userId },
    select: {
      Boycott: {
        select: adminBoycottSelect,
      },
    },
  });

  return favorites.map((favorite) => mapAdminBoycottSummary(favorite.Boycott));
}

export async function addAdminFavorite(userId: number, boycottId: number) {
  await prisma.userFavoriteBoycott.upsert({
    where: {
      UserID_BoycottID: { UserID: userId, BoycottID: boycottId },
    },
    update: {},
    create: {
      UserID: userId,
      BoycottID: boycottId,
    },
  });
}

export async function removeAdminFavorite(userId: number, boycottId: number) {
  await prisma.userFavoriteBoycott.delete({
    where: {
      UserID_BoycottID: { UserID: userId, BoycottID: boycottId },
    },
  });
}
