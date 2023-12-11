"use client";

import { TTweet } from "@/types/db";
import Link from "next/link";
import { MessageCircleIcon } from "lucide-react";
import { generateRColor } from "@/utils/functions";
import ImageWithFallback from "../ImageWithFallback";
import LikeTweet from "./LikeTweet";
import { type FC } from "react";
import { Oi } from "next/font/google";

type SingleTweetProps = TTweet;

const SingleTweet: FC<SingleTweetProps> = ({
    id: tweetId,
    body,
    likes,
    _count: { comments: _comments, likes: _likes },
    owner: { id: ownerId, image, name, userName },
    updatedAt
}) => {
    const userHref = `/${userName}`;

    return (
        <>
            <article className="border-x border-b border-slate-100 p-4 space-y-4">
                <div
                    className="grid grid-cols-[auto_4fr] grid-rows-[auto_1fr] gap-4">
                    <div>
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
                    <div className="flex justify-between items-start">
                        <Link
                            href={userHref}
                            className="flex flex-col items-start"
                        >
                            <span className="font-bold hover:underline">{name}</span>
                            <span className="text-slate-200">@{userName}</span>
                        </Link>
                    </div>
                    <div className="col-span-full">
                        <p className="whitespace-nowrap">{body}</p>
                    </div>
                </div>
                <div>
                    {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    }).format(new Date(updatedAt)).replaceAll(",", " · ")}
                </div>
                <div className="mt-4 flex items-center gap-8 justify-center border-y border-slate-50 py-2">
                    <LikeTweet
                        likes={likes}
                        count={_likes}
                        Qkey={['tweet', tweetId]}
                        tweetId={tweetId}
                        isInfiniteQuery={false}
                    />
                    <div className="inline-flex gap-2">
                        <MessageCircleIcon /> {_comments}
                    </div>
                </div>
                <div>
                    novo comentario
                </div>
            </article>
        </>
    );
};

export default SingleTweet;
