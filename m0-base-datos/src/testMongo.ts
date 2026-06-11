import "dotenv/config";

import {closeMongo, connectMongo } from "./mongoClient";

/**
 * Function: main.
 * Inputs: None.
 * Description: Tests the MongoDB connection by listing collections.
 * Outputs: Prints the collection names found in the ap_documents mongo db.
 */
async function main() {
    const db = await connectMongo();

    const collections = await db.listCollections().toArray();

    console.log("MongoDB connection works.");
    console.log("Collections: ");

    collections.forEach((collection) => {
        console.log(`- ${collection.name}`);
    });
}

main()
  .catch((error) => {
    console.error("Error testing MongoDB connection:", error);
  })
  .finally(async () => {
    await closeMongo();
  });