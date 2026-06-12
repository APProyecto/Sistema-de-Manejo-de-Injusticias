"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFileMetadata = buildFileMetadata;
/*
  Function: buildFileMetadata.
  Inputs:
    - fileName: String. Original file name.
    - fileSize: Number. File size in bytes.
    - contentType: String. MIME type of the file.
    - mongoFileId: ObjectId or String. GridFS file ID.
  Description: Builds a FileMetadata object using the standard AP Mongo document format.
  Outputs: FileMetadata object.
*/
function buildFileMetadata(fileName, fileSize, contentType, mongoFileId) {
    const fileId = mongoFileId.toString();
    return {
        fileName,
        fileSize,
        contentType,
        mongoFileId: fileId,
        gridFsId: fileId,
    };
}
