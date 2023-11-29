"use client";

import { getTweetsFromUser } from "@/utils/tweets";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteRender from "@/components/InfiniteRender";
import Tweet from "@/components/Tweet/Tweet";
import type { FC } from "react";

type ClientProfilePageProps = {
  userName: string;
};

const ClientProfilePage: FC<ClientProfilePageProps> = ({
  userName,
}) => {

  const { data: tweets, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["tweets", userName],
    queryFn: async ({ signal, pageParam }) =>
      await getTweetsFromUser({ pageParam, signal, userName: userName }),
    initialPageParam: "0",
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
  });

  return (
    <>
      <section>
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
      </section>
    </>
  );
};

export default ClientProfilePage;
