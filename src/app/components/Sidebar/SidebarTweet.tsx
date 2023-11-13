"use client";

import { postTweet } from "@/app/utils/tweets";
import { Feather } from "lucide-react";
import type { FC } from "react";

type SidebarTweetProps = {
  userId: string;
};

const SidebarTweet: FC<SidebarTweetProps> = ({ userId }) => {
  return (
    <button className="flex w-full items-center justify-center rounded-full bg-blue py-2 capitalize hover:bg-opacity-default">
      <Feather className="md:hidden" />
      <span className="hidden md:block">Tweet</span>
    </button>
  );
};

export default SidebarTweet;
