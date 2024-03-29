'use client';

import { getTweetsFromUser } from '@/utils/tweets';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteRender from '@/components/InfiniteRender';
import Tweet from '@/components/Tweet/Tweet';
import type { FC } from 'react';
import ProfileInfo from '@/app/components/Profile/ProfileInfo';

type ClientProfilePageProps = {
  userName: string;
};

const ClientProfilePage: FC<ClientProfilePageProps> = ({ userName }) => {
  const {
    data: tweets,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['tweets', userName],
    queryFn: async ({ signal, pageParam }) =>
      await getTweetsFromUser({ pageParam, signal, userName: userName }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage?.cursor ?? undefined,
  });

  return (
    <>
      <ProfileInfo userName={userName} />

      <section>
        <InfiniteRender
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        >
          {tweets?.pages?.map(
            (page) =>
              page.data?.map((tweet) => (
                <Tweet
                  {...tweet}
                  QKey={['tweets', userName]}
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
