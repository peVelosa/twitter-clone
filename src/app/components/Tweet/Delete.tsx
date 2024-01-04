import { TInfiniteResponse, TTweet } from '@/app/types/db';
import { deleteTweet } from '@/app/utils/tweets';

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
};

const Delete: FC<DeleteProps> = ({ QKey, ownerId, tweetId }) => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: QKey,
    mutationFn: async () => await deleteTweet({ tweetId, ownerId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QKey });
      const previousComments = queryClient.getQueryData(QKey);

      queryClient.setQueryData<unknown>(
        QKey,
        (old: InfiniteData<TInfiniteResponse<TTweet[]>>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.filter((t) => t.id !== tweetId),
          })),
        }),
      );

      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QKey, context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QKey] });
    },
  });

  return (
    <>
      {session?.user.id === ownerId && (
        <button
          className='rounded-full p-2 hover:bg-slate-50/20'
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
