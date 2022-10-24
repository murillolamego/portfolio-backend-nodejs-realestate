import "dotenv/config";
import { hash } from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(): Promise<void> {
  const saltRounds = 10;
  const password = await hash("123", saltRounds);

  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      name: "admin",
      password,
      admin: true,
    },
  });

  const notAdmin = await prisma.user.upsert({
    where: { email: "notadmin@test.com" },
    update: {},
    create: {
      email: "notadmin@test.com",
      name: "notadmin",
      password,
    },
  });
  console.log({ admin, notAdmin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
