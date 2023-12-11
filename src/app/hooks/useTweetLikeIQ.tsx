import {
  useMutation,
  InfiniteData,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query';
import { TInfiniteResponse, TTweet } from '@/types/db';
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
    onMutate: async (tweetId) => {
      await queryClient.cancelQueries({ queryKey: QKey });
      const previousLikes = queryClient.getQueryData(QKey);

      queryClient.setQueryData<unknown>(
        QKey,
        (old: InfiniteData<TInfiniteResponse<TTweet[]>>) => ({
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((tweet) => {
              if (tweet.id === tweetId) {
                return {
                  ...tweet,
                  likes: userHasLiked
                    ? tweet.likes.filter(({ id }) => id !== userId)
                    : [...tweet.likes, { id: userId }],
                  _count: {
                    ...tweet._count,
                    likes: userHasLiked
                      ? tweet._count.likes - 1
                      : tweet._count.likes + 1,
                  },
                };
              }
              return { ...tweet };
            }),
          })),
        }),
      );

      return { previousLikes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QKey, context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  return mutate;
};

export default useTweetLikeIQ;
