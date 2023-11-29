import { db } from '@/app/libs/db';
import { NextResponse } from 'next/server';

type RouteProps = {
  params: {
    userName: string;
  };
};

export async function GET(req: Request, { params: { userName } }: RouteProps) {
  if (!userName) throw new Error('No username provided'); //error
  try {
    const following = await db.user.findUnique({
      where: {
        userName: userName,
      },
      select: {
        following: {
          select: {
            id: true,
            userName: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ data: following?.following });
  } catch (e) {
    //handle erro
    console.error(e);
    return NextResponse.json('Something went wrong');
  }
}
