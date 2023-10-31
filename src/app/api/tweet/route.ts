import { NextResponse } from "next/server";
import { db } from "@/app/libs/db";

export async function GET(request: Request) {
  try {
    const data = await db.tweet.findMany({
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
    });

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

  if (!userId) return new Error("Missing user");
  if (!body) return new Error("Invalid tweet input");

  await db.tweet.create({
    data: {
      body,
      ownerId: userId,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
