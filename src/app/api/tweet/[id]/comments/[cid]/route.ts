import { NextResponse } from 'next/server';
import { db } from '@/app/libs/db';

type RouteProps = {
  params: {
    id: string;
    cid: string;
  };
};

export async function DELETE(
  request: Request,
  { params: { id, cid } }: RouteProps,
) {
  const { ownerId } = await request.json();
  if (!ownerId) throw new Error('Something went wrong');

  try {
    await db.comment.delete({
      where: {
        id: cid,
        ownerId,
        tweetId: id,
      },
    });

    return NextResponse.json({}, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}
