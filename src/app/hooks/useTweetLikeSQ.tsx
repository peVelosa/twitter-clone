import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';
import { TTweet } from '@/types/db';
import { unlikeTweet, likeTweet } from '@/utils/tweets';

type useTweetLikeIQProps = {
  QKey: QueryKey;
  userHasLiked: boolean;
  userId: string;
};

const useTweetLikeIQ = ({
  QKey,
  userHasLiked,
  userId,
}: useTweetLikeIQProps) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: QKey,
    mutationFn: async (tweetId: string) =>
      userHasLiked
        ? await unlikeTweet({ userId, tweetId })
        : await likeTweet({ userId, tweetId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QKey });
      const previousLikes = queryClient.getQueryData(QKey);

      queryClient.setQueryData<unknown>(QKey, (old: TTweet) => ({
        ...old,
        likes: userHasLiked
          ? old.likes.filter(({ id }) => id !== userId)
          : [...old.likes, { id: userId }],
        _count: {
          ...old._count,
          likes: userHasLiked ? old._count.likes - 1 : old._count.likes + 1,
        },
      }));

      return { previousLikes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QKey, context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QKey });
    },
  });

  return mutate;
};

export default useTweetLikeIQ;
