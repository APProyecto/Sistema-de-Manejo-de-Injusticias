import { ObjectId } from "mongodb";

export type FileMetadata = {
  fileId?: number;
  fileName: string;
  fileSize?: number;
  contentType?: string;
  mongoFileId?: ObjectId | string;
  gridFsId?: ObjectId | string;
};

export type AppUserDocument = {
  appUserId: number;
  appUsername: string;
  picture?: FileMetadata;
};

export type BoycottDocument = {
  mysqlid: number;
  title: string;
  description: string;
  creatorId: number;
  creatorUsername: string;
  entityId: number;
  entityName: string;
  entityDescription?: string;
  countryId: number;
  countryName: string;
  injusticeTypeId: number;
  injusticeTypeName: string;
  categoryId: number;
  categoryName: string;
  caseNumber?: number;
  filesNumber: number;
  publicationDate: Date;
  lastUpdateDate: Date;
  evidence: FileMetadata[];
};

export type EntityDocument = {
  entityId: number;
  entityName: string;
  picture?: FileMetadata;
};

export type InjusticeTypeDocument = {
  injusticeTypeId: number;
  injusticeTypeName: string;
  picture?: FileMetadata;
};