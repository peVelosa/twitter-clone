'use client';
import { getCommentsFromTweet, getTweet } from '@/app/utils/tweets';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import SingleTweet from '@/components/Tweet/SingleTweet';
import InfiniteRender from '@/components/InfiniteRender';
import CommentComponent from '@/components/Comments/Comment';
import { TComment } from '@/app/types/db';

const ClientTweetPage = ({ id }: { id: string }) => {
  const { data: tweet } = useQuery({
    queryKey: ['tweet', id],
    queryFn: async ({ signal }) => await getTweet({ tweetId: id, signal }),
  });
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['tweet', id, 'comments'],
    queryFn: async ({ signal, pageParam }) =>
      await getCommentsFromTweet({ tweetId: id, signal, pageParam }),
    initialPageParam: '0',

    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
  });

  if (!tweet) return <>loading...</>;

  return (
    <>
      <SingleTweet {...tweet} />
      <InfiniteRender
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        {comments?.pages?.map(
          (page) =>
            page?.data?.map((comment: TComment) => (
              <CommentComponent
                {...comment}
                Qkey={['tweet', id, 'comments']}
                key={comment.id}
              />
            )),
        )}
      </InfiniteRender>
      {comments?.pages[0]._count === 0 && (
        <div className='border-x border-b border-slate-50 p-4'>
          <p>Be the first one to reply!</p>
        </div>
      )}
    </>
  );
};

export default ClientTweetPage;
