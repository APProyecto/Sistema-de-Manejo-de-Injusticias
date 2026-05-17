import { PrismaClient } from "../generated/mysql";

const globalForPrisma = globalThis as unknown as {
  mysqlPrisma?: PrismaClient;
};

/*
  Function: mysqlPrisma.
  Inputs: None.
  Description: Creates and reuses a Prisma Client instance for the MySQL database.
  Outputs: A PrismaClient instance connected to MySQL.
*/
export const mysqlPrisma = globalForPrisma.mysqlPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = mysqlPrisma;
}