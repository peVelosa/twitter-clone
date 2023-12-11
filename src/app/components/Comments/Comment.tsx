"use client";

import { TTweet } from "@/types/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateRColor } from "@/utils/functions";
import ImageWithFallback from "../ImageWithFallback";
import { type FC } from "react";
import { type QueryKey } from "@tanstack/react-query";

type CommentProps = TTweet & { Qkey: QueryKey };

const Comment: FC<CommentProps> = ({
    id: commentId,
    body,
    likes,
    _count: { likes: _likes },
    owner: { id: ownerId, image, name, userName },
    Qkey
}) => {
    const router = useRouter();

    const tweetHref = `/comment/${commentId}`;
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
                    </div>
                    <div className="col-start-2 row-start-2">
                        <p className="whitespace-nowrap">{body}</p>
                        <div className="mt-4 flex items-center gap-4" onClick={e => e.stopPropagation()}>
                            {/* <LikeTweet likes={likes} count={_likes} Qkey={Qkey} tweetId={tweetId} /> */}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default Comment;
