import { db } from "@/app/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get("userName");
  const password = searchParams.get("password");
  if (!userName || !password) return NextResponse.json({});
  try {
    // const user = await db.user.findFirst({
    //   where: {
    //     OR: [{ email: userName, userName }],
    //   },
    // });
    const user = await db.user.findUnique({
      where: {
        email: userName,
      },
      select: {
        id: true,
        email: true,
        name: true,
        userName: true,
        image: true,
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    //handle erro
    return NextResponse.json({});
  }
}
