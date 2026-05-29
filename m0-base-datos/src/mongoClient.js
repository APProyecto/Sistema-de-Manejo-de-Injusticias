"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
exports.closeMongo = closeMongo;
const mongodb_1 = require("mongodb");
const mongoUrl = process.env.MONGODB_DATABASE_URL;
if (!mongoUrl) {
    throw new Error("MONGODB_DATABASE_URL is not defined");
}
const mongoClient = new mongodb_1.MongoClient(mongoUrl);
let mongoDb = null;
/*
  Function: connectMongo.
  Inputs: None.
  Description: Connects to MongoDB and returns the ap_documents database instance.
  Outputs: MongoDB database instance.
*/
async function connectMongo() {
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
async function closeMongo() {
    await mongoClient.close();
    mongoDb = null;
}
