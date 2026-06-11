import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

/**Import functions */
import {
    downloadFileFromGridFS,
    uploadFileToGridFS,
    deleteFileFromGridFS,
} from "../../../../m0-base-datos/src/services/gridfs.service";

import {
    createFileMetadata,
    createOrUpdateInjusticeTypeDocument,
    getInjusticeTypeDocumentById,
    getAppUserDocumentByUserId,
    updateInjusticeTypePicture,
    updateAppUserPicture,
    createOrUpdateEntityDocument,
    getEntityDocumentByEntityId,
    updateEntityPicture
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

import { buildFileMetadata } from "../../../../m0-base-datos/src/utils/fileMetadata";


/**
 * Function: uploadUserAppPicture
 * Inputs:
 *     appUserId: Number from url params
 *     file: Picuture file
 * Description: Uploads the UserApp picture to GridFS, creates/updates its mongo document and stores the Mongo document ID in MySQL.
 * Outputs:  JSON response with Mongo document ID and file information.
 */
export async function uploadUserAppPicture(req: Request, res: Response) {
    try{
        const appUserId = Number(req.params.appUserId);

        if(!Number.isInteger(appUserId) || appUserId <= 0) {
            return res.status(400).json({
                error: "Invalid appUserId",
            });
        }
        
        if(!req.file) {
            return res.status(400).json({
                error: "No file uploaded. Use form-data with key 'file' ",
            });
        }

        const appUser = await prisma.appUser.findUnique({
            where : {
                UserID: appUserId,
            },
            select : {
                UserID : true,
                UserName :true,
            },
        });

        if(!appUser) {
            return res.status(400).json({
                error: "appUser not found"
            });
        }

        const currentMongoDocument = await getAppUserDocumentByUserId(appUserId);

        if (currentMongoDocument?.picture?.mongoFileId) {
            await deleteFileFromGridFS(
                currentMongoDocument.picture.mongoFileId.toString()
            );
        }

        const mongoFileId = await uploadFileToGridFS(
            req.file.originalname,
            req.file.buffer,
            req.file.mimetype
        );

        const picture = buildFileMetadata (
            req.file.originalname,
            req.file.size,
            req.file.mimetype,
            mongoFileId
        );

        const fileMetadataResult = await createFileMetadata(picture);

        const mongoDocument = await updateAppUserPicture(
            appUser.UserID,
            appUser.UserName,
            picture 
        );

        if(!mongoDocument?._id) {
            return res.status(500).json({
                error: "Mongo document was not created or updated",
            });
        }

        await prisma.appUser.update({
            where : {
                UserID : appUser.UserID,
            },
            data : {
                MongoDocumentID : mongoDocument._id.toString(),
            }
        });

        return res.status(201).json({
            message: "appUser picture uploaded succesfully",
            appUserId: appUser.UserID,
            appUserName: appUser.UserName,
            mongoDocumentId: mongoDocument._id.toString(),
            mongoFileId: mongoFileId.toString(),
            fileMetadataId: fileMetadataResult.insertedId.toString(),
            picture,
        });


    }catch(error) {
        console.error("uploadUserAppPicture error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}
/**
 * Function: uploadInjusticePicture
 * Inputs:
 *  - injusticeTypeId: Number from url params
 *  - Description: Uploads an InjusticeType picture to GridFS, creates/updates its mongo document and stores the Mongo document ID in MySQL.
 * Outputs: JSON response with Mongo document ID and file information.
 */
export async function uploadInjusticeTypePicture(req: Request, res: Response) {
    try {
        const injusticeTypeId = Number(req.params.injusticeTypeId);

        if(!Number.isInteger(injusticeTypeId) || injusticeTypeId <= 0) {
            return res.status(400).json({
                error: "Invalid injusticeTypeId",
            });
        }
        
        if(!req.file) {
            return res.status(400).json({
                error: "No file uploaded. Use form-data with key 'file' ",
            });
        }

        const injusticeType = await prisma.injusticeType.findUnique({
            where: {
                InjusticeTypeID: injusticeTypeId,
            },
            select: {
                InjusticeTypeID: true,
                InjusticeName: true,
            },
        });

        if(!injusticeType) {
            return res.status(404).json({
                error: "Injustice type not found",
            });
        }

        const mongoFileId = await uploadFileToGridFS(
            req.file.originalname,
            req.file.buffer,
            req.file.mimetype
        );

        const picture = buildFileMetadata (
            req.file.originalname,
            req.file.size,
            req.file.mimetype,
            mongoFileId
        );

        const fileMetadataResult = await createFileMetadata(picture);

        const mongoDocument = await updateInjusticeTypePicture (
            injusticeType.InjusticeTypeID,
            injusticeType.InjusticeName,
            picture
        );

        if(!mongoDocument?._id) {
            return res.status(500).json({
                error: "Mongo document was not created or updated",
            });
        }

        await prisma.injusticeType.update({
            where : {
                InjusticeTypeID: injusticeTypeId,
            },
            data : {
                MongoDocumentID: mongoDocument._id.toString(),
            }
        });

        return res.status(201).json({
            message: "Injustice type picture uploaded successfully",
            injusticeTypeId: injusticeType.InjusticeTypeID,
            injusticeTypeName: injusticeType.InjusticeName,
            mongoDocumentId: mongoDocument._id.toString(),
            mongoFileId: mongoFileId.toString(),
            fileMetadataId: fileMetadataResult.insertedId.toString(),
            picture,
        });

    } catch (error) {
        console.error("uploadInjusticeTypePicture error:", error);

        return res.status(500).json({
        error: "Internal server error",
        });
    }
}

/**
 * Function: getInjusticeTypePicture
 * Inputs:
 *  - injusticeTypeId: Number from URL params.
 * Description: Gets and InjusticeType picture from MongoDb and returns it
 * Outputs: Binary image response
 */

export async function getInjusticeTypePicture(req: Request, res: Response) {
    try{
        const injusticeTypeId = Number(req.params.injusticeTypeId);

        if(!Number.isInteger(injusticeTypeId) || injusticeTypeId <= 0) {
            return res.status(400).json({
                error: "Invalid injusticeTypeId",
            });
        }

        const mongoDocument = await getInjusticeTypeDocumentById(injusticeTypeId);

        if(!mongoDocument?.picture?.mongoFileId) {
            return res.status(404).json({
                error: "Injustice type picture not found",
            });
        }

        const fileBuffer = await downloadFileFromGridFS(
            mongoDocument.picture.mongoFileId.toString()
        )

        res.setHeader(
            "Content-Type",
            mongoDocument.picture.contentType ?? "application/octet-stream"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${mongoDocument.picture.fileName}`
        );

        return res.send(fileBuffer);


    }catch(error) {
        console.error("getInjusticeTypePicture error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

/**
 * Function: syncInjusticeTypesToMongo
 * Inputs: None
 * Description: Createe in mongo de InjusticeTypes Documents duplicating the name and ID from the MySQL DB
 * Outputs: JSON with a succesful or error message
 */

export async function syncInjusticeTypesToMongo(_req: Request , res: Response) {
    try{

        const InjusticeTypes = await prisma.injusticeType.findMany({
            select: {
                InjusticeTypeID: true,
                InjusticeName: true,
            },
        });
        
        const results = [];

        for(const injusticeType of InjusticeTypes ) {
            const mongoDocument = await createOrUpdateInjusticeTypeDocument(                
                injusticeType.InjusticeTypeID,
                injusticeType.InjusticeName,
            );

            if(!mongoDocument?._id) {
                continue;
            }

            await prisma.injusticeType.update({
                where: {
                    InjusticeTypeID : injusticeType.InjusticeTypeID,
                },
                data: {
                    MongoDocumentID: mongoDocument._id.toString(),
                },
            });

            results.push({
                injusticeTypeId: injusticeType.InjusticeTypeID,
                injusticeTypeName: injusticeType.InjusticeName,
                mongoDocumentId: mongoDocument._id.toString(),
            });
        }

        return res.json({
            message: "Injustice types synchronized successfully",
            total: results.length,
            data: results,
        });

        

    } catch(error) {
        console.error("syncInjusticeTypesToMongo error", error);

        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

/**
 
Function: getUserAppPicture,
Inputs: appUserId from request params,
Description: Retrieves the user picture metadata from MongoDB,
and downloads the image stored in GridFS.,
Outputs: Image buffer or error message.*/

export async function getUserAppPicture(
    req: Request,
    res: Response
) {
    try {
        const appUserId = Number(
            req.params.appUserId
        );

        if (!Number.isInteger(appUserId) || appUserId <= 0) {
        return res.status(400).json({
            error: "Invalid appUserId",
        });
        }


        const appUser =
            await prisma.appUser.findUnique({
                where: {
                    UserID: appUserId,
                },
            });

        if (!appUser) {
            return res.status(404).json({
                error: "appUser not found",
            });
        }

        const currentMongoDocument =
            await getAppUserDocumentByUserId(
                appUser.UserID
            );

        if (
            !currentMongoDocument
                ?.picture
                ?.mongoFileId
        ) {
            return res.status(404).json({
                error:
                    "appUser picture not found",
            });
        }

        const fileBuffer =
            await downloadFileFromGridFS(
                currentMongoDocument
                    .picture
                    .mongoFileId
                    .toString()
            );

        res.setHeader(
            "Content-Type",
            currentMongoDocument.picture.contentType ?? "application/octet-stream"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${currentMongoDocument.picture.fileName}`
        );


        return res.send(fileBuffer);

    } catch (error) {
        console.error(
            "getUserAppPicture error:",
            error
        );

        return res.status(500).json({
            error:
                "Internal server error",
        });
    }
}


/**
 * Function: syncEntitiesToMongo
 * Inputs: None
 * Description: Create in mongo the Entities Documents duplicating the name and ID from the MySQL DB
 * Outputs: JSON with a succesful or error message
 */

export async function syncEntitiesToMongo(_req: Request , res: Response) {
    try{

        const entities = await prisma.entity.findMany({
            select: {
                EntityID: true,
                EntityName: true,
            },
        });
        
        const results = [];

        for(const entity of entities ) {
            
            const mongoDocument = await createOrUpdateEntityDocument(                
                entity.EntityID,
                entity.EntityName,
            );

            if(!mongoDocument?._id) {
                continue;
            }

            await prisma.entity.update({
                where: {
                    EntityID : entity.EntityID,
                },
                data: {
                    MongoDocumentID: mongoDocument._id.toString(),
                },
            });

            results.push({
                entityId: entity.EntityID,
                entityName: entity.EntityName,
                mongoDocumentId: mongoDocument._id.toString(),
            });
        }

        return res.json({
            message: "Entities synchronized successfully",
            total: results.length,
            data: results,
        });

        

    } catch(error) {
        console.error("syncEntitiesToMongo error", error);

        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

/**
 * Function: uploadEntityPicture
 * Inputs:
 *  - entityId: Number from url params
 *  - Description: Uploads an Entity picture to GridFS, creates/updates its mongo document and stores the Mongo document ID in MySQL.
 * Outputs: JSON response with Mongo document ID and file information.
 */
export async function uploadEntityPicture(req: Request, res: Response) {
    try {
        const entityId = Number(req.params.entityId);

        if(!Number.isInteger(entityId) || entityId <= 0) {
            return res.status(400).json({
                error: "Invalid entityId",
            });
        }
        
        if(!req.file) {
            return res.status(400).json({
                error: "No file uploaded. Use form-data with key 'file' ",
            });
        }

        const entity = await prisma.entity.findUnique({
            where: {
                EntityID: entityId,
            },
            select: {
                EntityID: true,
                EntityName: true,
            },
        });

        if(!entity) {
            return res.status(404).json({
                error: "Entity not found",
            });
        }

        const mongoFileId = await uploadFileToGridFS(
            req.file.originalname,
            req.file.buffer,
            req.file.mimetype
        );

        const picture = buildFileMetadata (
            req.file.originalname,
            req.file.size,
            req.file.mimetype,
            mongoFileId
        );

        const fileMetadataResult = await createFileMetadata(picture);

        const mongoDocument = await updateEntityPicture (
            entity.EntityID,
            entity.EntityName,
            picture
        );

        if(!mongoDocument?._id) {
            return res.status(500).json({
                error: "Mongo document was not created or updated",
            });
        }

        await prisma.entity.update({
            where : {
                EntityID: entity.EntityID,
            },
            data : {
                MongoDocumentID: mongoDocument._id.toString(),
            }
        });

        return res.status(201).json({
            message: "Injustice type picture uploaded successfully",
            entityId: entity.EntityID,
            entityName: entity.EntityName,
            mongoDocumentId: mongoDocument._id.toString(),
            mongoFileId: mongoFileId.toString(),
            fileMetadataId: fileMetadataResult.insertedId.toString(),
            picture,
        });

    } catch (error) {
        console.error("uploadEntityPicture error:", error);

        return res.status(500).json({
        error: "Internal server error",
        });
    }
}



/**
 * Function: getEntityPicture
 * Inputs:
 *  - entityId: Number from URL params.
 * Description: Gets an Entity picture from MongoDb and returns it
 * Outputs: Binary image response
 */

export async function getEntityPicture(req: Request, res: Response) {
    try{
        const entityId = Number(req.params.entityId);

        if(!Number.isInteger(entityId) || entityId <= 0) {
            return res.status(400).json({
                error: "Invalid entityId",
            });
        }

        const mongoDocument = await getEntityDocumentByEntityId(entityId);

        if(!mongoDocument?.picture?.mongoFileId) {
            return res.status(404).json({
                error: "entity picture not found",
            });
        }

        const fileBuffer = await downloadFileFromGridFS(
            mongoDocument.picture.mongoFileId.toString()
        )

        res.setHeader(
            "Content-Type",
            mongoDocument.picture.contentType ?? "application/octet-stream"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${mongoDocument.picture.fileName}`
        );

        return res.send(fileBuffer);


    }catch(error) {
        console.error("getEntityPicture error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

/**
 * Function: getEntityPicture
 * Inputs:
 *  - entityId: Number from URL params.
 * Description: Gets an Entity picture from MongoDb and returns it
 * Outputs: Binary image response
 */

export async function getEntityPictureByBoycottId(req: Request, res: Response) {
    try{
        const boycottId = Number(req.params.boycottId);

        if(!Number.isInteger(boycottId) || boycottId <= 0) {
            return res.status(400).json({
                error: "Invalid entityId",
            });
        }

        const entity = await prisma.boycott.findUnique({
            where : {
                BoycottID : boycottId,
            },

            select : {
                EntityID : true, 
            }
        });

        const mongoDocument = await getEntityDocumentByEntityId(entity?.EntityID || 1);

        if(!mongoDocument?.picture?.mongoFileId) {
            return res.status(404).json({
                error: "entity picture not found",
            });
        }

        const fileBuffer = await downloadFileFromGridFS(
            mongoDocument.picture.mongoFileId.toString()
        )

        res.setHeader(
            "Content-Type",
            mongoDocument.picture.contentType ?? "application/octet-stream"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename="${mongoDocument.picture.fileName}`
        );

        return res.send(fileBuffer);


    }catch(error) {
        console.error("getEntityPicture error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}


