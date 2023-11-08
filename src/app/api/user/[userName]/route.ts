import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

type GETProps = {
  params: {
    userName: string;
  };
};

export async function GET(req: Request, { params: { userName } }: GETProps) {
  if (!userName) throw new Error("No username provided"); //error
  try {
    const user = await db.user.findUnique({
      where: {
        userName: userName,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userName: true,
        image: true,
        followedBy: true,
        following: true,
        tweets: {
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
        },
      },
    });

    const data = {
      info: { ...user, tweets: undefined },
      tweets: user?.tweets,
    };

    return NextResponse.json(data);
  } catch (e) {
    //handle erro
    return NextResponse.json({});
  }
}
