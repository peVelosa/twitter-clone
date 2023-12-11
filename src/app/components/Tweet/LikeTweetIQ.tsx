import useTweetLikeIQ from '@/app/hooks/useTweetLikeIQ';
import { HeartIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { type QueryKey } from '@tanstack/react-query';
import type { FC } from 'react';

type LikeTweetIQProps = {
  likes: { id: string }[];
  count: number;
  QKey: QueryKey;
  tweetId: string;
};

const LikeTweetIQ: FC<LikeTweetIQProps> = ({ likes, count, QKey, tweetId }) => {
  const { data: session } = useSession();
  const userHasLiked = likes.some((like) => like.id === session?.user.id);

  const { mutate, isPending } = useTweetLikeIQ({
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

export default LikeTweetIQ;
