'use client';

import { useSession } from 'next-auth/react';
import ImageWithFallback from '../ImageWithFallback';
import { Button } from 'flowbite-react';
import { ElementRef, FC, useRef, useState } from 'react';
import {
  InfiniteData,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { commentTweet } from '@/app/utils/tweets';
import { TComment, TInfiniteResponse, TTweet } from '@/app/types/db';
import { adjustTextAreaHeight } from '@/app/utils/helpers';

type NewCommentProps = {
  QKey: QueryKey;
  tweetId: string;
};

const NewComment: FC<NewCommentProps> = ({ QKey, tweetId }) => {
  const { data: session } = useSession();
  const replyRef = useRef<ElementRef<'textarea'>>(null);
  const [reply, setReply] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: QKey,
    mutationFn: async (reply: string) => {
      setReply('');
      await commentTweet({ tweetId, ownerId: session?.user.id, body: reply });
    },
    onMutate: async (reply) => {
      await queryClient.cancelQueries({ queryKey: [...QKey, 'comments'] });
      await queryClient.cancelQueries({ queryKey: QKey });

      const previousComments = queryClient.getQueryData([...QKey, 'comments']);
      const previousCommentsCount = queryClient.getQueryData(QKey);

      // Optimistic Update for comments
      queryClient.setQueryData<unknown>(
        [...QKey, 'comments'],
        (old: InfiniteData<TInfiniteResponse<TComment[]>>) => ({
          ...old,

          pages: [
            {
              _count: 1,
              data: [
                {
                  id: 'no-id',
                  tweetId,
                  owner: { ...session?.user },
                  body: reply,
                  likes: [],
                  updatedAt: new Date(),
                  _count: { likes: 0 },
                },
              ],
            },
            ...old.pages,
          ],
        }),
      );

      // Optimistic Update for comments count
      queryClient.setQueryData<unknown>(QKey, (old: TTweet) => ({
        ...old,
        _count: {
          ...old._count,
          comments: old._count.comments + 1,
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

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!replyRef.current) return;
    adjustTextAreaHeight(replyRef.current);
    setReply(e.target.value);
  }

  return (
    <>
      <div className='flex items-start gap-4'>
        <div className='h-10 w-10'>
          <ImageWithFallback
            alt='profile image'
            src={session?.user?.image}
            width={20}
            height={20}
            className='h-full w-full rounded-full'
          />
        </div>
        <textarea
          ref={replyRef}
          value={reply}
          placeholder='Post your reply!'
          className='min-h-[4rem] flex-grow resize-none bg-transparent text-lg'
          onChange={onChange}
        />
        <Button
          className='ml-auto rounded-full p-0'
          onClick={() => mutation.mutate(reply)}
          disabled={reply.length === 0}
        >
          Reply
        </Button>
      </div>
    </>
  );
};

export default NewComment;
