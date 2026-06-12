"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileMetadata = createFileMetadata;
exports.getFileMetadataByMongoFileId = getFileMetadataByMongoFileId;
exports.deleteFileMetadataByMongoFileId = deleteFileMetadataByMongoFileId;
exports.createAppUserDocument = createAppUserDocument;
exports.createOrUpdateAppUserDocument = createOrUpdateAppUserDocument;
exports.getAppUserDocumentByUserId = getAppUserDocumentByUserId;
exports.updateAppUserDocument = updateAppUserDocument;
exports.updateAppUserPicture = updateAppUserPicture;
exports.deleteAppUserPicture = deleteAppUserPicture;
exports.deleteAppUserDocument = deleteAppUserDocument;
exports.createBoycottDocument = createBoycottDocument;
exports.createOrUpdateBoycottDocument = createOrUpdateBoycottDocument;
exports.getBoycottDocumentByMysqlId = getBoycottDocumentByMysqlId;
exports.updateBoycottDocument = updateBoycottDocument;
exports.addEvidenceToBoycott = addEvidenceToBoycott;
exports.removeEvidenceFromBoycott = removeEvidenceFromBoycott;
exports.deleteBoycottDocument = deleteBoycottDocument;
exports.createEntityDocument = createEntityDocument;
exports.createOrUpdateEntityDocument = createOrUpdateEntityDocument;
exports.getEntityDocumentByEntityId = getEntityDocumentByEntityId;
exports.updateEntityDocument = updateEntityDocument;
exports.updateEntityPicture = updateEntityPicture;
exports.deleteEntityPicture = deleteEntityPicture;
exports.deleteEntityDocument = deleteEntityDocument;
exports.createInjusticeTypeDocument = createInjusticeTypeDocument;
exports.createOrUpdateInjusticeTypeDocument = createOrUpdateInjusticeTypeDocument;
exports.getInjusticeTypeDocumentById = getInjusticeTypeDocumentById;
exports.updateInjusticeTypeDocument = updateInjusticeTypeDocument;
exports.updateInjusticeTypePicture = updateInjusticeTypePicture;
exports.deleteInjusticeTypePicture = deleteInjusticeTypePicture;
exports.deleteInjusticeTypeDocument = deleteInjusticeTypeDocument;
const mongoClient_1 = require("../mongoClient");
/*
  Function: getCollections.
  Inputs: None.
  Description: Gets the MongoDB collections used by the AP project.
  Outputs: Object containing MongoDB collections.
*/
async function getCollections() {
    const db = await (0, mongoClient_1.connectMongo)();
    return {
        files: db.collection("files"),
        appUserDocuments: db.collection("appUserDocuments"),
        boycottDocuments: db.collection("boycottDocuments"),
        entityDocuments: db.collection("entityDocuments"),
        injusticeTypeDocuments: db.collection("injusticeTypeDocuments"),
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
  Outputs: MongoDB insert result including insertedId.
*/
async function createFileMetadata(file) {
    const { files } = await getCollections();
    return files.insertOne(file);
}
/*
  Function: getFileMetadataByMongoFileId.
  Inputs:
    - mongoFileId: String. GridFS file ObjectId as string.
  Description: Gets file metadata by mongoFileId or gridFsId.
  Outputs: File metadata document or null.
*/
async function getFileMetadataByMongoFileId(mongoFileId) {
    const { files } = await getCollections();
    return files.findOne({
        $or: [{ mongoFileId }, { gridFsId: mongoFileId }],
    });
}
/*
  Function: deleteFileMetadataByMongoFileId.
  Inputs:
    - mongoFileId: String. GridFS file ObjectId as string.
  Description: Deletes file metadata by mongoFileId or gridFsId.
  Outputs: MongoDB delete result.
*/
async function deleteFileMetadataByMongoFileId(mongoFileId) {
    const { files } = await getCollections();
    return files.deleteOne({
        $or: [{ mongoFileId }, { gridFsId: mongoFileId }],
    });
}
/* =========================
   AppUser documents
========================= */
/*
  Function: createAppUserDocument.
  Inputs:
    - document: AppUserDocument. Mongo document linked to AppUser from MySQL.
  Description: Creates an AppUser document in MongoDB.
  Outputs: MongoDB insert result including insertedId.
*/
async function createAppUserDocument(document) {
    const { appUserDocuments } = await getCollections();
    return appUserDocuments.insertOne(document);
}
/*
  Function: createOrUpdateAppUserDocument.
  Inputs:
    - appUserId: Number. User ID from MySQL.
    - appUsername: String. Username from MySQL.
  Description: Creates or updates the base Mongo document linked to an AppUser.
  Outputs: Updated or created AppUser document.
*/
async function createOrUpdateAppUserDocument(appUserId, appUsername) {
    const { appUserDocuments } = await getCollections();
    await appUserDocuments.updateOne({ appUserId }, {
        $set: {
            appUserId,
            appUsername,
        },
    }, { upsert: true });
    return appUserDocuments.findOne({ appUserId });
}
/*
  Function: getAppUserDocumentByUserId.
  Inputs:
    - appUserId: Number. User ID from MySQL.
  Description: Gets the Mongo document linked to an AppUser.
  Outputs: AppUser document or null.
*/
async function getAppUserDocumentByUserId(appUserId) {
    const { appUserDocuments } = await getCollections();
    return appUserDocuments.findOne({ appUserId });
}
/*
  Function: updateAppUserDocument.
  Inputs:
    - appUserId: Number. User ID from MySQL.
    - data: Partial<AppUserDocument>. Fields to update.
  Description: Updates fields of an AppUser Mongo document.
  Outputs: Updated AppUser document or null.
*/
async function updateAppUserDocument(appUserId, data) {
    const { appUserDocuments } = await getCollections();
    await appUserDocuments.updateOne({ appUserId }, { $set: data });
    return appUserDocuments.findOne({ appUserId });
}
/*
  Function: updateAppUserPicture.
  Inputs:
    - appUserId: Number. User ID from MySQL.
    - appUsername: String. Username from MySQL.
    - picture: FileMetadata. Profile picture metadata.
  Description: Creates or updates the profile picture linked to an AppUser.
  Outputs: Updated or created AppUser document.
*/
async function updateAppUserPicture(appUserId, appUsername, picture) {
    const { appUserDocuments } = await getCollections();
    await appUserDocuments.updateOne({ appUserId }, {
        $set: {
            appUserId,
            appUsername,
            picture,
        },
    }, { upsert: true });
    return appUserDocuments.findOne({ appUserId });
}
/*
  Function: deleteAppUserPicture.
  Inputs:
    - appUserId: Number. User ID from MySQL.
  Description: Removes the profile picture metadata from an AppUser Mongo document.
  Outputs: Updated AppUser document or null.
*/
async function deleteAppUserPicture(appUserId) {
    const { appUserDocuments } = await getCollections();
    await appUserDocuments.updateOne({ appUserId }, {
        $unset: {
            picture: "",
        },
    });
    return appUserDocuments.findOne({ appUserId });
}
/*
  Function: deleteAppUserDocument.
  Inputs:
    - appUserId: Number. User ID from MySQL.
  Description: Deletes the AppUser Mongo document.
  Outputs: MongoDB delete result.
*/
async function deleteAppUserDocument(appUserId) {
    const { appUserDocuments } = await getCollections();
    return appUserDocuments.deleteOne({ appUserId });
}
/* =========================
   Boycott documents
========================= */
/*
  Function: createBoycottDocument.
  Inputs:
    - document: BoycottDocument. Mongo document linked to Boycott from MySQL.
  Description: Creates a Boycott document in MongoDB.
  Outputs: MongoDB insert result including insertedId.
*/
async function createBoycottDocument(document) {
    const { boycottDocuments } = await getCollections();
    return boycottDocuments.insertOne(document);
}
/*
  Function: createOrUpdateBoycottDocument.
  Inputs:
    - document: BoycottDocument. Mongo document linked to Boycott from MySQL.
  Description: Creates or updates a Boycott Mongo document using mysqlid.
  Outputs: Updated or created Boycott document.
*/
async function createOrUpdateBoycottDocument(document) {
    const { boycottDocuments } = await getCollections();
    await boycottDocuments.updateOne({ mysqlid: document.mysqlid }, {
        $set: {
            ...document,
            lastUpdateDate: new Date(),
        },
    }, { upsert: true });
    return boycottDocuments.findOne({ mysqlid: document.mysqlid });
}
/*
  Function: getBoycottDocumentByMysqlId.
  Inputs:
    - mysqlid: Number. Boycott ID from MySQL.
  Description: Gets the Mongo document linked to a Boycott.
  Outputs: Boycott document or null.
*/
async function getBoycottDocumentByMysqlId(mysqlid) {
    const { boycottDocuments } = await getCollections();
    return boycottDocuments.findOne({ mysqlid });
}
/*
  Function: updateBoycottDocument.
  Inputs:
    - mysqlid: Number. Boycott ID from MySQL.
    - data: Partial<BoycottDocument>. Fields to update.
  Description: Updates fields of a Boycott Mongo document.
  Outputs: Updated Boycott document or null.
*/
async function updateBoycottDocument(mysqlid, data) {
    const { boycottDocuments } = await getCollections();
    await boycottDocuments.updateOne({ mysqlid }, {
        $set: {
            ...data,
            lastUpdateDate: new Date(),
        },
    });
    return boycottDocuments.findOne({ mysqlid });
}
/*
  Function: addEvidenceToBoycott.
  Inputs:
    - mysqlid: Number. Boycott ID from MySQL.
    - file: FileMetadata. Evidence file metadata.
  Description: Adds an evidence file to a Boycott Mongo document.
  Outputs: Updated Boycott document or null.
*/
async function addEvidenceToBoycott(mysqlid, file) {
    const { boycottDocuments } = await getCollections();
    await boycottDocuments.updateOne({ mysqlid }, {
        $push: { evidence: file },
        $inc: { filesNumber: 1 },
        $set: { lastUpdateDate: new Date() },
    });
    return boycottDocuments.findOne({ mysqlid });
}
/*
  Function: removeEvidenceFromBoycott.
  Inputs:
    - mysqlid: Number. Boycott ID from MySQL.
    - mongoFileId: String. GridFS file ObjectId as string.
  Description: Removes an evidence file from a Boycott Mongo document.
  Outputs: Updated Boycott document or null.
*/
async function removeEvidenceFromBoycott(mysqlid, mongoFileId) {
    const { boycottDocuments } = await getCollections();
    await boycottDocuments.updateOne({ mysqlid }, {
        $pull: {
            evidence: {
                mongoFileId,
            },
        },
        $inc: { filesNumber: -1 },
        $set: { lastUpdateDate: new Date() },
    });
    return boycottDocuments.findOne({ mysqlid });
}
/*
  Function: deleteBoycottDocument.
  Inputs:
    - mysqlid: Number. Boycott ID from MySQL.
  Description: Deletes the Boycott Mongo document.
  Outputs: MongoDB delete result.
*/
async function deleteBoycottDocument(mysqlid) {
    const { boycottDocuments } = await getCollections();
    return boycottDocuments.deleteOne({ mysqlid });
}
/* =========================
   Entity documents
========================= */
/*
  Function: createEntityDocument.
  Inputs:
    - document: EntityDocument. Mongo document linked to Entity from MySQL.
  Description: Creates an Entity document in MongoDB.
  Outputs: MongoDB insert result including insertedId.
*/
async function createEntityDocument(document) {
    const { entityDocuments } = await getCollections();
    return entityDocuments.insertOne(document);
}
/*
  Function: createOrUpdateEntityDocument.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
    - entityName: String. Entity name from MySQL.
  Description: Creates or updates the base Mongo document linked to an Entity.
  Outputs: Updated or created Entity document.
*/
async function createOrUpdateEntityDocument(entityId, entityName) {
    const { entityDocuments } = await getCollections();
    await entityDocuments.updateOne({ entityId }, {
        $set: {
            entityId,
            entityName,
        },
    }, { upsert: true });
    return entityDocuments.findOne({ entityId });
}
/*
  Function: getEntityDocumentByEntityId.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
  Description: Gets the Mongo document linked to an Entity.
  Outputs: Entity document or null.
*/
async function getEntityDocumentByEntityId(entityId) {
    const { entityDocuments } = await getCollections();
    return entityDocuments.findOne({ entityId });
}
/*
  Function: updateEntityDocument.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
    - data: Partial<EntityDocument>. Fields to update.
  Description: Updates fields of an Entity Mongo document.
  Outputs: Updated Entity document or null.
*/
async function updateEntityDocument(entityId, data) {
    const { entityDocuments } = await getCollections();
    await entityDocuments.updateOne({ entityId }, { $set: data });
    return entityDocuments.findOne({ entityId });
}
/*
  Function: updateEntityPicture.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
    - entityName: String. Entity name from MySQL.
    - picture: FileMetadata. Entity picture metadata.
  Description: Creates or updates the picture linked to an Entity.
  Outputs: Updated or created Entity document.
*/
async function updateEntityPicture(entityId, entityName, picture) {
    const { entityDocuments } = await getCollections();
    await entityDocuments.updateOne({ entityId }, {
        $set: {
            entityId,
            entityName,
            picture,
        },
    }, { upsert: true });
    return entityDocuments.findOne({ entityId });
}
/*
  Function: deleteEntityPicture.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
  Description: Removes the picture metadata from an Entity Mongo document.
  Outputs: Updated Entity document or null.
*/
async function deleteEntityPicture(entityId) {
    const { entityDocuments } = await getCollections();
    await entityDocuments.updateOne({ entityId }, {
        $unset: {
            picture: "",
        },
    });
    return entityDocuments.findOne({ entityId });
}
/*
  Function: deleteEntityDocument.
  Inputs:
    - entityId: Number. Entity ID from MySQL.
  Description: Deletes the Entity Mongo document.
  Outputs: MongoDB delete result.
*/
async function deleteEntityDocument(entityId) {
    const { entityDocuments } = await getCollections();
    return entityDocuments.deleteOne({ entityId });
}
/* =========================
   InjusticeType documents
========================= */
/*
  Function: createInjusticeTypeDocument.
  Inputs:
    - document: InjusticeTypeDocument. Mongo document linked to InjusticeType from MySQL.
  Description: Creates an InjusticeType document in MongoDB.
  Outputs: MongoDB insert result including insertedId.
*/
async function createInjusticeTypeDocument(document) {
    const { injusticeTypeDocuments } = await getCollections();
    return injusticeTypeDocuments.insertOne(document);
}
/*
  Function: createOrUpdateInjusticeTypeDocument.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
    - injusticeTypeName: String. InjusticeType name from MySQL.
  Description: Creates or updates the base Mongo document linked to an InjusticeType.
  Outputs: Updated or created InjusticeType document.
*/
async function createOrUpdateInjusticeTypeDocument(injusticeTypeId, injusticeTypeName) {
    const { injusticeTypeDocuments } = await getCollections();
    await injusticeTypeDocuments.updateOne({ injusticeTypeId }, {
        $set: {
            injusticeTypeId,
            injusticeTypeName,
        },
    }, { upsert: true });
    return injusticeTypeDocuments.findOne({ injusticeTypeId });
}
/*
  Function: getInjusticeTypeDocumentById.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
  Description: Gets the Mongo document linked to an InjusticeType.
  Outputs: InjusticeType document or null.
*/
async function getInjusticeTypeDocumentById(injusticeTypeId) {
    const { injusticeTypeDocuments } = await getCollections();
    return injusticeTypeDocuments.findOne({ injusticeTypeId });
}
/*
  Function: updateInjusticeTypeDocument.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
    - data: Partial<InjusticeTypeDocument>. Fields to update.
  Description: Updates fields of an InjusticeType Mongo document.
  Outputs: Updated InjusticeType document or null.
*/
async function updateInjusticeTypeDocument(injusticeTypeId, data) {
    const { injusticeTypeDocuments } = await getCollections();
    await injusticeTypeDocuments.updateOne({ injusticeTypeId }, { $set: data });
    return injusticeTypeDocuments.findOne({ injusticeTypeId });
}
/*
  Function: updateInjusticeTypePicture.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
    - injusticeTypeName: String. InjusticeType name from MySQL.
    - picture: FileMetadata. InjusticeType picture metadata.
  Description: Creates or updates the picture linked to an InjusticeType.
  Outputs: Updated or created InjusticeType document.
*/
async function updateInjusticeTypePicture(injusticeTypeId, injusticeTypeName, picture) {
    const { injusticeTypeDocuments } = await getCollections();
    await injusticeTypeDocuments.updateOne({ injusticeTypeId }, {
        $set: {
            injusticeTypeId,
            injusticeTypeName,
            picture,
        },
    }, { upsert: true });
    return injusticeTypeDocuments.findOne({ injusticeTypeId });
}
/*
  Function: deleteInjusticeTypePicture.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
  Description: Removes the picture metadata from an InjusticeType Mongo document.
  Outputs: Updated InjusticeType document or null.
*/
async function deleteInjusticeTypePicture(injusticeTypeId) {
    const { injusticeTypeDocuments } = await getCollections();
    await injusticeTypeDocuments.updateOne({ injusticeTypeId }, {
        $unset: {
            picture: "",
        },
    });
    return injusticeTypeDocuments.findOne({ injusticeTypeId });
}
/*
  Function: deleteInjusticeTypeDocument.
  Inputs:
    - injusticeTypeId: Number. InjusticeType ID from MySQL.
  Description: Deletes the InjusticeType Mongo document.
  Outputs: MongoDB delete result.
*/
async function deleteInjusticeTypeDocument(injusticeTypeId) {
    const { injusticeTypeDocuments } = await getCollections();
    return injusticeTypeDocuments.deleteOne({ injusticeTypeId });
}
