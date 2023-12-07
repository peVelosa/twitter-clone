import { NextResponse } from 'next/server';
import { db } from '@/app/libs/db';

type RouteProps = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: RouteProps) {
  try {
    console.log(id);
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
    return NextResponse.json({ data }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: 404 });
  }
}

// export async function POST(request: Request) {
//   const { userId, body } = (await request.json()) as {
//     userId: string;
//     body: string;
//   };

//   if (!userId)
//     return NextResponse.json({ error: "No user id found" }, { status: 500 });

//   if (!body)
//     return NextResponse.json({ error: "No body found" }, { status: 500 });

//   await db.tweet.create({
//     data: {
//       body,
//       ownerId: userId,
//     },
//   });

//   return NextResponse.json({}, { status: 201 });
// }
