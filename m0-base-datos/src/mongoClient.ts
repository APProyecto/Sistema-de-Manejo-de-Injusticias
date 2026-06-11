import { Db, MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_DATABASE_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_DATABASE_URL is not defined");
}

const mongoClient = new MongoClient(mongoUrl);

let mongoDb: Db | null = null;

/*
  Function: connectMongo.
  Inputs: None.
  Description: Connects to MongoDB and returns the ap_documents database instance.
  Outputs: MongoDB database instance.
*/
export async function connectMongo(): Promise<Db> {
  if (mongoDb) {
    return mongoDb;
  }

  await mongoClient.connect();
  mongoDb = mongoClient.db("ap_documents");

  return mongoDb;
}

/*
  Function: closeMongo.
  Inputs: None.
  Description: Closes the MongoDB connection.
  Outputs: None.
*/
export async function closeMongo(): Promise<void> {
  await mongoClient.close();
  mongoDb = null;
}