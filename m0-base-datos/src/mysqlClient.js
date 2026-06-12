"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlPrisma = void 0;
const mysql_1 = require("../generated/mysql");
const globalForPrisma = globalThis;
/*
  Function: mysqlPrisma.
  Inputs: None.
  Description: Creates and reuses a Prisma Client instance for the MySQL database.
  Outputs: A PrismaClient instance connected to MySQL.
*/
exports.mysqlPrisma = globalForPrisma.mysqlPrisma ?? new mysql_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.mysqlPrisma = exports.mysqlPrisma;
}
