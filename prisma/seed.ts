import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProfileTypes() {
  await prisma.profile.createMany({
    data: [
      {
        id: "1",
        profile: "customer",
      },
      {
        id: "2",
        profile: "seller",
      },
    ],
  });
}

createProfileTypes().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
