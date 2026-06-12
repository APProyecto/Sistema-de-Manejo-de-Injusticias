"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToGridFS = uploadFileToGridFS;
exports.downloadFileFromGridFS = downloadFileFromGridFS;
exports.deleteFileFromGridFS = deleteFileFromGridFS;
const mongodb_1 = require("mongodb");
const mongoClient_1 = require("../mongoClient");
/*
  Function: getGridFSBucket.
  Inputs: None.
  Description: Gets the GridFS bucket used to store binary files.
  Outputs: GridFSBucket instance.
*/
async function getGridFSBucket() {
    const db = await (0, mongoClient_1.connectMongo)();
    return new mongodb_1.GridFSBucket(db, {
        bucketName: "uploads",
    });
}
/*
  Function: uploadFileToGridFS.
  Inputs:
    - fileName: String. Name of the file.
    - buffer: Buffer. File content.
    - contentType: String. MIME type of the file.
  Description: Uploads a file buffer to MongoDB GridFS.
  Outputs: ObjectId of the stored file.
*/
async function uploadFileToGridFS(fileName, buffer, contentType) {
    const bucket = await getGridFSBucket();
    return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(fileName, {
            contentType,
        });
        uploadStream.end(buffer);
        uploadStream.on("finish", () => {
            resolve(uploadStream.id);
        });
        uploadStream.on("error", reject);
    });
}
/*
  Function: downloadFileFromGridFS.
  Inputs:
    - mongoFileId: String. ObjectId of the file in GridFS.
  Description: Downloads a file from MongoDB GridFS.
  Outputs: Buffer with the file content.
*/
async function downloadFileFromGridFS(mongoFileId) {
    const bucket = await getGridFSBucket();
    const chunks = [];
    return new Promise((resolve, reject) => {
        const downloadStream = bucket.openDownloadStream(new mongodb_1.ObjectId(mongoFileId));
        downloadStream.on("data", (chunk) => {
            chunks.push(chunk);
        });
        downloadStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        downloadStream.on("error", reject);
    });
}
/*
  Function: deleteFileFromGridFS.
  Inputs:
    - mongoFileId: String. ObjectId of the file in GridFS.
  Description: Deletes a file from MongoDB GridFS.
  Outputs: None.
*/
async function deleteFileFromGridFS(mongoFileId) {
    const bucket = await getGridFSBucket();
    await bucket.delete(new mongodb_1.ObjectId(mongoFileId));
}
