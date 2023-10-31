// import { hashPassword } from "@/lib/auth";

import { db } from "../src/app/libs/db";

async function main() {
  //id 1 to 3
  await db.user.createMany({
    data: [
      {
        id: "1",
        email: "user1@email.com",
        name: "Dev User 1",
        userName: "devUser1",
      },
      {
        id: "2",
        email: "user2@email.com",
        name: "Dev User 2",
        userName: "devUser2",
      },
      {
        id: "3",
        email: "user3@email.com",
        name: "Dev User 3",
        userName: "devUser3",
      },
    ],
  });

  //id 1 to 6
  await db.tweet.createMany({
    data: [
      {
        id: "1",
        ownerId: "1",
        body: "tweet test 1",
      },
      {
        id: "2",
        ownerId: "1",
        body: "tweet test 2",
      },
      {
        id: "3",
        ownerId: "2",
        body: "tweet test 3",
      },
      {
        id: "4",
        ownerId: "2",
        body: "tweet test 4",
      },
      {
        id: "5",
        ownerId: "3",
        body: "tweet test 5",
      },
      {
        id: "6",
        ownerId: "3",
        body: "tweet test 6",
      },
    ],
  });

  await db.tweet.update({
    where: { id: "1" },
    data: {
      likes: {
        connect: {
          id: "1",
        },
      },
    },
  });
  await db.tweet.update({
    where: { id: "1" },
    data: {
      likes: {
        connect: {
          id: "2",
        },
      },
    },
  });
  await db.tweet.update({
    where: { id: "2" },
    data: {
      likes: {
        connect: {
          id: "2",
        },
      },
    },
  });
  await db.tweet.update({
    where: { id: "2" },
    data: {
      likes: {
        connect: {
          id: "3",
        },
      },
    },
  });
  await db.tweet.update({
    where: { id: "3" },
    data: {
      likes: {
        connect: {
          id: "2",
        },
      },
    },
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
