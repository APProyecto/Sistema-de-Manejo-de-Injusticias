"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
exports.closeMongo = closeMongo;
const mongodb_1 = require("mongodb");
const mongoUrl = process.env.MONGODB_DATABASE_URL ?? "mongodb://127.0.0.1:27017/ap_documents";
if (!process.env.MONGODB_DATABASE_URL) {
    console.warn("MONGODB_DATABASE_URL is not defined. Falling back to mongodb://127.0.0.1:27017/ap_documents");
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
