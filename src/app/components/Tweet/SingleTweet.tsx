'use client';

import { TTweet } from '@/types/db';
import Link from 'next/link';
import { MessageCircleIcon } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';
import LikeTweetSQ from './LikeTweetSQ';
import NewComment from '../Comments/NewComment';
import { type FC } from 'react';

type SingleTweetProps = TTweet;

const SingleTweet: FC<SingleTweetProps> = ({
  id: tweetId,
  body,
  likes,
  _count: { comments: _comments, likes: _likes },
  owner: { id: ownerId, image, name, userName },
  updatedAt,
}) => {
  const userHref = `/${userName}`;

  return (
    <>
      <article className='space-y-4 border-x border-b border-slate-100 p-4'>
        <div className='grid grid-cols-[auto_4fr] grid-rows-[auto_1fr] gap-4'>
          <div>
            <Link
              href={userHref}
              className='relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full'
              style={{ backgroundColor: 'green' }}
            >
              <ImageWithFallback
                alt='user image profile'
                src={image}
                width={20}
                height={20}
                className='h-full w-full'
              />
            </Link>
          </div>
          <div className='flex items-start justify-between'>
            <Link
              href={userHref}
              className='flex flex-col items-start'
            >
              <span className='font-bold hover:underline'>{name}</span>
              <span className='text-slate-200'>@{userName}</span>
            </Link>
          </div>
          <div className='col-span-full'>
            <p className='whitespace-nowrap'>{body}</p>
          </div>
        </div>
        <div>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
            .format(new Date(updatedAt))
            .replaceAll(',', ' · ')}
        </div>
        <div className='mt-4 flex items-center justify-center gap-8 border-y border-slate-50 py-2'>
          <LikeTweetSQ
            likes={likes}
            count={_likes}
            QKey={['tweet', tweetId]}
            tweetId={tweetId}
          />
          <div className='inline-flex gap-2'>
            <MessageCircleIcon /> {_comments}
          </div>
        </div>
        <NewComment
          Qkey={['tweet', tweetId]}
          tweetId={tweetId}
        />
      </article>
    </>
  );
};

export default SingleTweet;
