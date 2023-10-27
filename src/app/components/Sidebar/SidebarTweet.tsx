"use client";

import { postTweet } from "@/app/utils/tweets";
import { Feather } from "lucide-react";
import type { FC } from "react";

type SidebarTweetProps = {
  userId: string;
};

const SidebarTweet: FC<SidebarTweetProps> = ({ userId }) => {
  return (
    <button
      className="bg-blue hover:bg-opacity-default flex w-full items-center justify-center rounded-full py-2 capitalize"
      // onClick={() => postTweet({ body: "teste", userId })}
    >
      <Feather className="md:hidden" />
      <span className="hidden md:block">Tweet</span>
    </button>
  );
};

export default SidebarTweet;
