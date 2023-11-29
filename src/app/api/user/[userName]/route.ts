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
    console.error(e);
    return NextResponse.json('Something went wrong');
  }
}

export async function PUT(req: Request, { params: { userName } }: RouteProps) {
  const { data } = await req.json();
  try {
    await db.user.update({
      where: {
        userName: userName,
      },
      data,
    });
    return NextResponse.json({}, { status: 201 });
  } catch (e) {
    //handle erro
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}
