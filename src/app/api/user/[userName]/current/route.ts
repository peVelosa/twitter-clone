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
    const user = await db.user.findUnique({
      where: {
        userName: userName,
      },
      select: {
        id: true,
        name: true,
        userName: true,
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
      },
    });

    return NextResponse.json(user);
  } catch (e) {
    //handle erro
    console.error(e);
    return NextResponse.json('Something went wrong');
  }
}
