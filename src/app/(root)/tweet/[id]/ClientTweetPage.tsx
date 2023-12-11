'use client';
import { getCommentsFromTweet, getTweet } from '@/app/utils/tweets';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import SingleTweet from '@/components/Tweet/SingleTweet';
import InfiniteRender from '@/components/InfiniteRender';
import CommentComponent from '@/components/Comments/Comment';

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

  console.log(comments);

  return (
    <>
      <SingleTweet {...tweet} />
      <InfiniteRender
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      >
        {comments?.pages?.map((page) =>
          page.data.map((comment: any) => (
            <CommentComponent
              {...comment}
              Qkey={['tweet', id, 'comments']}
              key={comment.id}
            />
          )),
        )}
      </InfiniteRender>
    </>
  );
};

export default ClientTweetPage;
