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
        followedBy: {
          select: {
            id: true,
          },
        },
        following: {
          select: {
            id: true,
          },
        },
        background: true,
        createdAt: true,
        tweets: false,
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    //handle erro
    return NextResponse.json({});
  }
}
