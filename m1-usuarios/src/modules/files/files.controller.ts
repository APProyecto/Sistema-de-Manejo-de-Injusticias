import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

/**Import functions */
import {
    downloadFileFromGridFS,
    uploadFileToGridFS,
} from "../../../../m0-base-datos/src/services/gridfs.service";

import {
    createFileMetadata,
    createOrUpdateInjusticeTypeDocument,
    getInjusticeTypeDocumentById,
    updateInjusticeTypePicture,
} from "../../../../m0-base-datos/src/services/mongoDocuments.service";

import { buildFileMetadata } from "../../../../m0-base-datos/src/utils/fileMetadata";

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