import { NextResponse } from 'next/server';
import { db } from '@/app/libs/db';

type RouteProps = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: RouteProps) {
  try {
    const data = await db.tweet.findUnique({
      where: {
        id,
      },
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
        updatedAt: true,
        _count: true,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}

export async function DELETE(request: Request, { params: { id } }: RouteProps) {
  const { ownerId } = await request.json();
  if (!ownerId) throw new Error('Something went wrong');

  try {
    await db.tweet.delete({
      where: {
        id,
        ownerId,
      },
    });

    return NextResponse.json({}, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}
