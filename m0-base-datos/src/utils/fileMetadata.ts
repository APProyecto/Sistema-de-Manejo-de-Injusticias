import type { ObjectId } from "mongodb";
import type { FileMetadata } from "../types/mongoDocuments";

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
export function buildFileMetadata(
  fileName: string,
  fileSize: number,
  contentType: string,
  mongoFileId: ObjectId | string
): FileMetadata {
  const fileId = mongoFileId.toString();

  return {
    fileName,
    fileSize,
    contentType,
    mongoFileId: fileId,
    gridFsId: fileId,
  };
}