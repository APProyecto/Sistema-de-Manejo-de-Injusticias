import { mysqlPrisma } from "./mysqlClient";

/*
  Function: main.
  Inputs: None.
  Description: Tests the MySQL Prisma connection by counting AppUser records.
  Outputs: Prints the total number of AppUser records.
*/

async function main() {
    const totalUsers = await mysqlPrisma.appUser.count();

    console.log("MySQL connection works.");
    console.log(`Total AppUser records: ${totalUsers}`);


}

main().catch((error) => {console.error("Error testing MySQL connection:", error)}).finally(async () => { await mysqlPrisma.$disconnect();})