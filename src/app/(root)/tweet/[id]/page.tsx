import { getCommentsFromTweet, getTweet } from '@/app/utils/tweets';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import ClientTweetPage from './ClientTweetPage';
import PageTitle from '@/app/components/PageTitle';

const TweetPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tweet', id],
    queryFn: async ({ signal }) => await getTweet({ tweetId: id, signal }),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['tweet', id, 'comments'],
    queryFn: async ({ signal }) =>
      await getCommentsFromTweet({ tweetId: id, signal }),

    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage?.cursor ?? undefined,
    pages: 1,
  });

  return (
    <>
      <div className='flex-grow'>
        <PageTitle title={'Post'} />
        <section>
          <ClientTweetPage id={id} />
        </section>
      </div>
    </>
  );
};

export default TweetPage;
