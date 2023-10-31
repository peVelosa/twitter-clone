import { NextResponse } from "next/server";
import { db } from "@/app/libs/db";

const MAX_TWEETS_PER_REQUEST = 5;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("cursor");

    let data;

    if (!cursor || cursor === "0") {
      data = await db.tweet.findMany({
        select: {
          id: true,
          body: true,
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
              userName: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
          },
          _count: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: MAX_TWEETS_PER_REQUEST,
      });
    } else {
      data = await db.tweet.findMany({
        select: {
          id: true,
          body: true,
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
              userName: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
          },
          _count: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: MAX_TWEETS_PER_REQUEST,
        cursor: {
          id: cursor,
        },
        skip: 1,
      });
    }

    const res = {
      data,
      _count: data.length,
      cursor: data[data.length - 1].id,
    };
    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}
export async function POST(request: Request) {
  const { userId, body } = (await request.json()) as {
    userId: string;
    body: string;
  };

  if (!userId)
    return NextResponse.json({ error: "No user id found" }, { status: 500 });

  if (!body)
    return NextResponse.json({ error: "No body found" }, { status: 500 });

  await db.tweet.create({
    data: {
      body,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
