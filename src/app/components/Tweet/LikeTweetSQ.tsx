import { HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type QueryKey } from '@tanstack/react-query';
import useTweetLikeSQ from '@/hooks/useTweetLikeSQ';
import type { FC } from 'react';

type LikeTweetSQProps = {
  likes: { id: string }[];
  count: number;
  QKey: QueryKey;
  tweetId: string;
};

const LikeTweetSQ: FC<LikeTweetSQProps> = ({ likes, count, QKey, tweetId }) => {
  const { data: session } = useSession();
  const userHasLiked = likes.some((like) => like.id === session?.user.id);

  const { mutate, isPending } = useTweetLikeSQ({
    QKey,
    userHasLiked,
    userId: session?.user.id,
  });

  return (
    <>
      <button
        className='group inline-flex items-center gap-1'
        onClick={() => mutate(tweetId)}
        disabled={isPending}
      >
        <span className='rounded-full p-2 group-hover:bg-red-400 group-disabled:hover:bg-slate-400'>
          <HeartIcon />
        </span>
        <span className='group-hover:text-red-400 group-disabled:hover:text-slate-400'>
          {count}
        </span>
      </button>
    </>
  );
};

export default LikeTweetSQ;
