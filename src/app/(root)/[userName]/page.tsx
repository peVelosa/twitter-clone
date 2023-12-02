import PageTitle from "@/components/PageTitle";
import { getUserData, getUserFollowers, getUserFollowing } from "@/utils/user";
import ClientProfilePage from "./ClientProfilePage";
import { getTweetsFromUser } from "@/utils/tweets";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import type { FC } from "react";

type ProfilePageProps = {
  params: { userName: string };
};

const ProfilePage: FC<ProfilePageProps> = async ({ params: { userName } }) => {
  const queryClient = new QueryClient()

  const user = await getUserData({
    userName,
    signal: new AbortController().signal,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['tweets', userName],
    queryFn: async ({ signal, pageParam }) =>
      await getTweetsFromUser({ pageParam, signal, userName }),
    initialPageParam: "0",
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
    pages: 1
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', userName],
    queryFn: async () => await getUserData({
      userName,
      signal: new AbortController().signal,
    }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', userName, "followers"],
    queryFn: async ({ signal }) => await getUserFollowers({ userName, signal }),
  })
  await queryClient.prefetchQuery({
    queryKey: ['profile', userName, "following"],
    queryFn: async ({ signal }) => await getUserFollowing({ userName, signal }),
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageTitle title={user.name} />
        {/* ajustar page title */}
        <div className="isolate">
          <ProfileInfo userName={userName} />
          <ClientProfilePage
            userName={userName}
          />
        </div>
      </HydrationBoundary>

    </>
  );
};

export default ProfilePage;
