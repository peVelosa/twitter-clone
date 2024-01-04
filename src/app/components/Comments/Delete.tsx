import { TComment, TInfiniteResponse, TTweet } from '@/app/types/db';
import { deleteComment, deleteTweet } from '@/app/utils/tweets';

import {
  useMutation,
  type MutationKey,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type FC } from 'react';

type DeleteProps = {
  QKey: MutationKey;
  ownerId: string;
  tweetId: string;
  commentId: string;
};

const Delete: FC<DeleteProps> = ({ QKey, ownerId, tweetId, commentId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [...QKey, 'comments'],
    mutationFn: async () =>
      await deleteComment({ tweetId, ownerId, commentId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [...QKey, 'comments'] });
      await queryClient.cancelQueries({ queryKey: QKey });

      const previousComments = queryClient.getQueryData([...QKey, 'comments']);
      const previousCommentsCount = queryClient.getQueryData(QKey);

      //Optimistic Update for comments
      queryClient.setQueryData<unknown>(
        [...QKey, 'comments'],
        (old: InfiniteData<TInfiniteResponse<TComment[]>>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.filter((c) => c.id !== commentId),
          })),
        }),
      );

      // Optimistic Update for comments count
      queryClient.setQueryData<unknown>(QKey, (old: TTweet) => ({
        ...old,
        _count: {
          ...old._count,
          comments: old._count.comments - 1,
        },
      }));

      return { previousComments, previousCommentsCount };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        [...QKey, 'comments'],
        context?.previousComments,
      );
      queryClient.setQueryData(QKey, context?.previousCommentsCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QKey });
      queryClient.invalidateQueries({ queryKey: [...QKey, 'comments'] });
    },
  });

  console.log(QKey);

  return (
    <>
      {session?.user.id === ownerId && (
        <button
          className='rounded-full p-2 hover:bg-slate-50/20'
          disabled={commentId === 'no-id'}
          onClick={(e) => {
            e.stopPropagation();
            mutation.mutate();
          }}
        >
          <Trash stroke='red' />
        </button>
      )}
    </>
  );
};

export default Delete;
