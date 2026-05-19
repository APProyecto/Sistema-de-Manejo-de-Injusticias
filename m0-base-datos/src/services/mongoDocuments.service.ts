import { connectMongo } from "../mongoClient";
import {
  AppUserDocument,
  BoycottDocument,
  EntityDocument,
  FileMetadata,
  InjusticeTypeDocument,
} from "../types/mongoDocuments";

/*
  Function: getCollections.
  Inputs: None.
  Description: Gets the MongoDB collections used by the AP project.
  Outputs: Object containing MongoDB collections.
*/
async function getCollections() {
  const db = await connectMongo();

  return {
    files: db.collection<FileMetadata>("files"),
    appUserDocuments: db.collection<AppUserDocument>("appUserDocuments"),
    boycottDocuments: db.collection<BoycottDocument>("boycottDocuments"),
    entityDocuments: db.collection<EntityDocument>("entityDocuments"),
    injusticeTypeDocuments:
      db.collection<InjusticeTypeDocument>("injusticeTypeDocuments"),
  };
}

/* =========================
   Files
========================= */

/*
  Function: createFileMetadata.
  Inputs:
    - file: FileMetadata. Metadata of the uploaded file.
  Description: Inserts file metadata into the files collection.
  Outputs: Insert result.
*/
export async function createFileMetadata(file: FileMetadata) {
  const { files } = await getCollections();

  return files.insertOne(file);
}

/*
  Function: deleteFileMetadataByMongoFileId.
  Inputs:
    - mongoFileId: String. GridFS file ObjectId as string.
  Description: Deletes file metadata by mongoFileId or gridFsId.
  Outputs: Delete result.
*/
export async function deleteFileMetadataByMongoFileId(mongoFileId: string) {
  const { files } = await getCollections();

  return files.deleteOne({
    $or: [{ mongoFileId }, { gridFsId: mongoFileId }],
  });
}

/* =========================
   AppUser documents
========================= */

export async function createAppUserDocument(document: AppUserDocument) {
  const { appUserDocuments } = await getCollections();

  return appUserDocuments.insertOne(document);
}

export async function getAppUserDocumentByUserId(appUserId: number) {
  const { appUserDocuments } = await getCollections();

  return appUserDocuments.findOne({ appUserId });
}

export async function updateAppUserDocument(
  appUserId: number,
  data: Partial<AppUserDocument>
) {
  const { appUserDocuments } = await getCollections();

  return appUserDocuments.updateOne(
    { appUserId },
    { $set: data }
  );
}

export async function deleteAppUserDocument(appUserId: number) {
  const { appUserDocuments } = await getCollections();

  return appUserDocuments.deleteOne({ appUserId });
}

/* =========================
   Boycott documents
========================= */

export async function createBoycottDocument(document: BoycottDocument) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.insertOne(document);
}

export async function getBoycottDocumentByMysqlId(mysqlid: number) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.findOne({ mysqlid });
}

export async function updateBoycottDocument(
  mysqlid: number,
  data: Partial<BoycottDocument>
) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.updateOne(
    { mysqlid },
    {
      $set: {
        ...data,
        lastUpdateDate: new Date(),
      },
    }
  );
}

export async function deleteBoycottDocument(mysqlid: number) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.deleteOne({ mysqlid });
}

export async function addEvidenceToBoycott(
  mysqlid: number,
  file: FileMetadata
) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.updateOne(
    { mysqlid },
    {
      $push: { evidence: file },
      $inc: { filesNumber: 1 },
      $set: { lastUpdateDate: new Date() },
    }
  );
}

export async function removeEvidenceFromBoycott(
  mysqlid: number,
  mongoFileId: string
) {
  const { boycottDocuments } = await getCollections();

  return boycottDocuments.updateOne(
    { mysqlid },
    {
      $pull: {
        evidence: {
          $or: [
            { mongoFileId },
            { gridFsId: mongoFileId },
          ],
        } as any,
      },
      $inc: { filesNumber: -1 },
      $set: { lastUpdateDate: new Date() },
    }
  );
}

/* =========================
   Entity documents
========================= */

export async function createEntityDocument(document: EntityDocument) {
  const { entityDocuments } = await getCollections();

  return entityDocuments.insertOne(document);
}

export async function getEntityDocumentByEntityId(entityId: number) {
  const { entityDocuments } = await getCollections();

  return entityDocuments.findOne({ entityId });
}

export async function updateEntityDocument(
  entityId: number,
  data: Partial<EntityDocument>
) {
  const { entityDocuments } = await getCollections();

  return entityDocuments.updateOne(
    { entityId },
    { $set: data }
  );
}

export async function deleteEntityDocument(entityId: number) {
  const { entityDocuments } = await getCollections();

  return entityDocuments.deleteOne({ entityId });
}

/* =========================
   InjusticeType documents
========================= */

export async function createInjusticeTypeDocument(
  document: InjusticeTypeDocument
) {
  const { injusticeTypeDocuments } = await getCollections();

  return injusticeTypeDocuments.insertOne(document);
}

export async function getInjusticeTypeDocumentById(
  injusticeTypeId: number
) {
  const { injusticeTypeDocuments } = await getCollections();

  return injusticeTypeDocuments.findOne({ injusticeTypeId });
}

export async function updateInjusticeTypeDocument(
  injusticeTypeId: number,
  data: Partial<InjusticeTypeDocument>
) {
  const { injusticeTypeDocuments } = await getCollections();

  return injusticeTypeDocuments.updateOne(
    { injusticeTypeId },
    { $set: data }
  );
}

export async function deleteInjusticeTypeDocument(
  injusticeTypeId: number
) {
  const { injusticeTypeDocuments } = await getCollections();

  return injusticeTypeDocuments.deleteOne({ injusticeTypeId });
}