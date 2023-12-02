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

export async function PUT(req: Request, { params: { userName } }: RouteProps) {
  if (!userName) throw new Error('No username provided');

  const {
    data: { id, action },
  } = await req.json();

  if (!id) throw new Error('No id provided');

  if (!action) throw new Error('No action provided');

  try {
    if (action === 'follow') {
      await db.user.update({
        where: {
          userName,
        },
        data: {
          following: {
            connect: {
              id,
            },
          },
        },
      });
    } else {
      await db.user.update({
        where: {
          userName,
        },
        data: {
          following: {
            disconnect: {
              id,
            },
          },
        },
      });
    }

    return NextResponse.json({});
  } catch (e) {
    //handle erro
    console.error(e);
    return NextResponse.json('Something went wrong');
  }
}
