"use client";

import { TTweet } from "@/types/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";

type TweetProps = TTweet;

const Tweet: FC<TweetProps> = ({
  id: tweetId,
  body,
  likes,
  owner: { id: ownerId, image, name, userName },
}) => {
  const router = useRouter();

  const tweetHref = `/tweet/${tweetId}`;

  return (
    <div
      className="grid grid-cols-[auto_4fr] grid-rows-[auto_1fr] gap-4 border-b border-default p-2 hover:bg-slate-800"
      onClick={() => {
        router.push(tweetHref);
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`/${userName}`}>image</Link>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Link href={`/${userName}`}>
          {name}@{userName}
        </Link>
      </div>
      <div className="col-start-2 row-start-2">
        <p className="whitespace-nowrap">{body}</p>
      </div>
    </div>
  );
};

export default Tweet;
