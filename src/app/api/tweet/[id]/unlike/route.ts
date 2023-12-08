import { db } from '@/app/libs/db';
import { NextResponse } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

export async function PUT(request: Request, { params: { id: tweetId } }: RouteProps) {
  if (!tweetId) return NextResponse.json({ error: 'No tweet found' }, { status: 500 });

  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: 'No user id found' }, { status: 500 });

  await db.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      likes: {
        disconnect: {
          id: userId,
        },
      },
    },
  });

  return NextResponse.json({}, { status: 201 });
}
