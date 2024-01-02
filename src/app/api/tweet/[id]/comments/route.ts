import { db } from '@/app/libs/db';
import { NextResponse } from 'next/server';

type RouteProps = {
  params: {
    id: string;
  };
};

const MAX_TWEETS_PER_REQUEST = 5;

export async function GET(request: Request, { params: { id } }: RouteProps) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');

    let data;

    if (!cursor || cursor === '0') {
      data = await db.comment.findMany({
        where: {
          tweetId: id,
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
          tweetId: true,
          updatedAt: true,
          _count: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: MAX_TWEETS_PER_REQUEST,
      });
    } else {
      data = await db.comment.findMany({
        where: {
          tweetId: id,
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
          tweetId: true,
          _count: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        take: MAX_TWEETS_PER_REQUEST,
        cursor: {
          updatedAt: cursor,
        },
        skip: 1,
      });
    }

    const res = {
      data,
      _count: data?.length,
      cursor: data[data.length - 1]?.updatedAt ?? undefined,
    };

    return NextResponse.json(res, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}

export async function POST(
  request: Request,
  { params: { id: tweetId } }: RouteProps,
) {
  if (!tweetId)
    return NextResponse.json({ error: 'No tweet found' }, { status: 500 });

  const {
    data: { body, ownerId },
  } = await request.json();
  if (!body || !ownerId)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );

  await db.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      comments: {
        create: {
          ownerId,
          body,
        },
      },
    },
  });
  return NextResponse.json({}, { status: 201 });
}
