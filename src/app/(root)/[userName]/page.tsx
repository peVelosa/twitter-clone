import PageTitle from "@/app/components/PageTitle";
import { getUserData } from "@/app/utils/user";
import ClientProfilePage from "./ClientProfilePage";
import { getTweetsFromUser } from "@/app/utils/tweets";
import ProfileInfo from "@/app/components/Profile/ProfileInfo";
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

  await queryClient.prefetchQuery({
    queryKey: ['profile', userName],
    queryFn: async () => await getUserData({
      userName,
      signal: new AbortController().signal,
    }),
  })
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['tweets', userName],
    queryFn: async ({ signal, pageParam }) =>
      await getTweetsFromUser({ pageParam, signal, userName }),
    initialPageParam: "0",
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
    pages: 1
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PageTitle title={user.name} />
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
