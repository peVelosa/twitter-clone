"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTweets } from "@/utils/tweets";
import Tweet from "@/components/Tweet/Tweet";
import InfiniteRender from "../components/InfiniteRender";

const ClientHomePage = () => {
  const { data: tweets, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: async ({ signal, pageParam }) =>
      await getTweets({ pageParam, signal }),
    initialPageParam: "0",

    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
  });

  return (
    <>
      <InfiniteRender fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
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
