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
export const mysqlPrisma = globalForPrisma.mysqlPrisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = mysqlPrisma;
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("[Prisma] SIGTERM received, disconnecting...");
  await mysqlPrisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("[Prisma] SIGINT received, disconnecting...");
  await mysqlPrisma.$disconnect();
  process.exit(0);
});