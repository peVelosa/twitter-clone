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
import { TComment, TInfiniteResponse } from '@/app/types/db';
import { adjustTextAreaHeight } from '@/app/utils/helpers';

type NewCommentProps = {
  Qkey: QueryKey;
  tweetId: string;
};

const NewComment: FC<NewCommentProps> = ({ Qkey, tweetId }) => {
  const { data: session } = useSession();
  const replyRef = useRef<ElementRef<'textarea'>>(null);
  const [reply, setReply] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: Qkey,
    mutationFn: async (reply: string) => {
      setReply('');
      await commentTweet({ tweetId, ownerId: session?.user.id, body: reply });
    },
    onMutate: async (reply) => {
      await queryClient.cancelQueries({ queryKey: [...Qkey, 'comments'] });
      const previousComments = queryClient.getQueryData([...Qkey, 'comments']);

      queryClient.setQueryData<unknown>(
        [...Qkey, 'comments'],
        (old: InfiniteData<TInfiniteResponse<TComment[]>>) => ({
          ...old,

          pages: [
            {
              _count: 1,
              data: [
                {
                  id: Math.floor(Math.random() + 1000),
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

      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(Qkey, context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: Qkey });
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
