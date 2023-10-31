"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTweets } from "@/utils/tweets";
import Tweet from "@/components/Tweet/Tweet";
import { useInView } from "react-intersection-observer";

import { TInfiniteResponse, TTweet } from "@/types/db";
import { useEffect, type FC } from "react";

type ClientHomePageProps = {
  initialTweetData: TInfiniteResponse<TTweet[]>;
};

const ClientHomePage: FC<ClientHomePageProps> = ({ initialTweetData }) => {
  const { ref, inView } = useInView();

  const { data: tweets, fetchNextPage } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: async ({ signal, pageParam }) =>
      await getTweets({ pageParam, signal }),
    initialPageParam: "0",
    initialData: {
      pageParams: ["0"],
      pages: [initialTweetData],
    },
    getNextPageParam: (lastPage, pages) => lastPage.cursor ?? undefined,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      {tweets?.pages?.map(
        (page) =>
          page.data?.map((tweet) => (
            <Tweet
              {...tweet}
              key={tweet.id}
            />
          )),
      )}
      <div
        ref={ref}
        className="pointer-events-none opacity-0"
      ></div>
    </div>
  );
};

export default ClientHomePage;
