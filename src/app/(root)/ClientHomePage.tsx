"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTweets } from "@/utils/tweets";
import Tweet from "@/components/Tweet/Tweet";
import InfiniteRender from "../components/InfiniteRender";

import type { TInfiniteResponse, TTweet } from "@/types/db";
import { type FC } from "react";

type ClientHomePageProps = {
  initialTweetData: TInfiniteResponse<TTweet[]>;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialTweetData }) => {
  const { data: tweets, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: async ({ signal, pageParam }) =>
      await getTweets({ pageParam, signal }),
    initialPageParam: "0",
    initialData: {
      pageParams: ["0"],
      pages: [initialTweetData],
    },
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
  });

  return (
    <>
      <InfiniteRender fetchNextPage={fetchNextPage}>
        {tweets?.pages?.map(
          (page) =>
            page.data?.map((tweet) => (
              <Tweet
                {...tweet}
                key={tweet.id}
              />
            )),
        )}
      </InfiniteRender>
    </>
  );
};

export default ClientHomePage;
