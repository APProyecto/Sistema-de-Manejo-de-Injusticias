import { mysqlPrisma } from "../../../m0-base-datos/src/mysqlClient";

/*
  Function: prisma.
  Description: Exposes the shared MySQL Prisma Client from m0-base-datos.
  Author: Persona 4
  Date: 2026-05-25
*/
export const prisma = mysqlPrisma;