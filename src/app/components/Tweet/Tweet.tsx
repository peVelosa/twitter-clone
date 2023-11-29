"use client";

import { TTweet } from "@/types/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { generateRColor } from "@/utils/functions";
import ImageWithFallback from "../ImageWithFallback";
import { useSession } from "next-auth/react";

type TweetProps = TTweet;

const Tweet: FC<TweetProps> = ({
  id: tweetId,
  body,
  likes,
  _count: { comments: _comments, likes: _likes },
  owner: { id: ownerId, image, name, userName },
}) => {
  const router = useRouter();
  const { data: session } = useSession()

  const tweetHref = `/tweet/${tweetId}`;
  const userHref = `/${userName}`;

  return (
    <>
      <article>
        <div
          className="grid cursor-pointer grid-cols-[auto_4fr] grid-rows-[auto_1fr] gap-4 border-x border-b border-default p-4 hover:bg-slate-800"
          onClick={() => {
            router.push(tweetHref);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={userHref}
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: "green" }}
            >
              <ImageWithFallback
                alt="user image profile"
                src={image}
                width={20}
                height={20}
                className="h-full w-full"
              />
            </Link>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="flex justify-between items-start">
            <Link
              href={userHref}
              className="flex items-center gap-2"
            >
              <span className="font-bold hover:underline">{name}</span>
              <span className="text-slate-200">@{userName}</span>
            </Link>
            {session && session.user?.id !== ownerId && (
              <button>
                {session.user?.following.find(({ id }: { id: string }) => id === ownerId) ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className="col-start-2 row-start-2">
            <p className="whitespace-nowrap">{body}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="inline-flex gap-2">
                <HeartIcon />
                {_likes}
              </div>
              <div className="inline-flex gap-2">
                <MessageCircleIcon /> {_comments}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Tweet;
