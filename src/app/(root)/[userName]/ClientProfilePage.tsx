"use client";

import { getTweetsFromUser } from "@/app/utils/tweets";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TInfiniteResponse, TTweet, TUserProfile } from "@/app/types/db";
import InfiniteRender from "@/app/components/InfiniteRender";
import Tweet from "@/app/components/Tweet/Tweet";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import ProfileInfo from "@/app/components/Profile/ProfileInfo";
import EditProfile from "@/app/components/Profile/EditProfile";
import type { FC } from "react";

type ClientProfilePageProps = {
  user: TUserProfile;
  initialTweetData: TInfiniteResponse<TTweet[]>;
};

const ClientProfilePage: FC<ClientProfilePageProps> = ({
  user,
  initialTweetData,
}) => {

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
      <div className="grid grid-cols-1 grid-rows-[8rem_50px_50px_auto] bg-white">
        <div className="col-start-1 row-span-2 row-start-1 bg-slate-300" />
        <EditProfile {...user} />
        <ImageWithFallback
          src={user.image}
          width={100}
          height={100}
          alt="user image profile"
          className="z-20 col-start-1 row-span-2 row-start-2 ml-4 aspect-square rounded-full border-4 border-white"
        />
        <ProfileInfo {...user} />
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
