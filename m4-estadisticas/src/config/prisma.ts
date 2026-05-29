import { mysqlPrisma } from "../../../m0-base-datos/src/mysqlClient";

/*
  Function: prisma.
  Inputs: None.
  Description: Exposes the shared MySQL Prisma Client from m0-base-datos.
  Outputs: Shared Prisma Client instance.
*/
export const prisma = mysqlPrisma;
