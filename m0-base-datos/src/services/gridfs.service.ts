import { GridFSBucket, ObjectId } from "mongodb";
import { connectMongo } from "../mongoClient";

/*
  Function: getGridFSBucket.
  Inputs: None.
  Description: Gets the GridFS bucket used to store binary files.
  Outputs: GridFSBucket instance.
*/
async function getGridFSBucket(): Promise<GridFSBucket> {
  const db = await connectMongo();

  return new GridFSBucket(db, {
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
export async function uploadFileToGridFS(
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<ObjectId> {
  const bucket = await getGridFSBucket();

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(fileName, {
      contentType,
    });

    uploadStream.end(buffer);

    uploadStream.on("finish", () => {
      resolve(uploadStream.id as ObjectId);
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
export async function downloadFileFromGridFS(
  mongoFileId: string
): Promise<Buffer> {
  const bucket = await getGridFSBucket();
  const chunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    const downloadStream = bucket.openDownloadStream(
      new ObjectId(mongoFileId)
    );

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
export async function deleteFileFromGridFS(
  mongoFileId: string
): Promise<void> {
  const bucket = await getGridFSBucket();

  await bucket.delete(new ObjectId(mongoFileId));
}