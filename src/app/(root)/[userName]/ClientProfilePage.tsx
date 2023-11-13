"use client";

import { getTweetsFromUser } from "@/app/utils/tweets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import type { TInfiniteResponse, TTweet, TUserProfile } from "@/app/types/db";
import InfiniteRender from "@/app/components/InfiniteRender";
import Tweet from "@/app/components/Tweet/Tweet";

type ClientProfilePageProps = {
  user: TUserProfile;
  initialTweetData: TInfiniteResponse<TTweet[]>;
};

const ClientProfilePage = ({
  user,
  initialTweetData,
}: ClientProfilePageProps) => {
  const { data: tweets, fetchNextPage } = useInfiniteQuery({
    queryKey: [user.id, "tweets"],
    queryFn: async ({ signal, pageParam }) =>
      await getTweetsFromUser({ pageParam, signal, userName: user.userName }),
    initialPageParam: "0",
    initialData: {
      pageParams: ["0"],
      pages: [initialTweetData],
    },
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
  });

  return (
    <>
      <div className="col-start-1 row-span-full row-start-3 h-full bg-white pb-4 pt-14">
        <div>
          <div className="text-black">
            <div className="mb-4 pl-4">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <h3 className="text-slate-600">@{user.userName}</h3>
            </div>
            <h4 className="flex items-center gap-2 pl-4 text-slate-600">
              <Calendar className="stroke-slate-500" />
              Joined{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "long",
                year: "numeric",
              }).format(new Date(user.createdAt))}
            </h4>
          </div>
        </div>
      </div>

      <section>
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
      </section>
    </>
  );
};

export default ClientProfilePage;
