'use client';

import { Calendar } from 'lucide-react';
import { TUserProfile } from '@/types/db';
import { useQuery } from '@tanstack/react-query';
import ImageWithFallback from '../ImageWithFallback';
import EditProfile from './EditProfile';
import { getUserData } from '@/app/utils/user';
import FollowingButton from './FollowingButton';
import FollowersButton from './FollowersButton';
import { type FC } from 'react';
import { useSession } from 'next-auth/react';
import IsFollowingComponent from '../IsFollowing';

type ProfileInfoProps = {
  userName: string;
};

const ProfileInfo: FC<ProfileInfoProps> = ({ userName }) => {
  const { data: session, update } = useSession();

  const { data: user } = useQuery<TUserProfile>({
    queryKey: ['profile', userName],
    queryFn: async () =>
      await getUserData({
        userName,
        signal: new AbortController().signal,
      }),
  });

  if (!user) return;

  const { name, image, createdAt, background } = user;

  const isOwnProfile = user.userName === session?.user?.userName;

  return (
    <>
      <div className='grid grid-cols-1 grid-rows-[8rem_50px_50px_auto] bg-white'>
        <div className='relative col-start-1 row-span-2 row-start-1'>
          {background ? (
            <ImageWithFallback
              src={background}
              width={1000}
              height={1000}
              alt='user background profile image'
              className='h-full w-full'
            />
          ) : (
            <div className='h-full w-full bg-slate-400' />
          )}
        </div>
        <ImageWithFallback
          src={image}
          width={100}
          height={100}
          alt='user image profile'
          className='z-20 col-start-1 row-span-2 row-start-2 ml-4 aspect-square rounded-full border-4 border-white'
        />
        <div className='col-start-1 row-span-full row-start-4 h-full p-4 pt-0 text-slate-600'>
          <div>
            <h2 className='text-xl font-bold text-black'>{name}</h2>
            <h3 className='mb-4 text-slate-600'>@{userName}</h3>
          </div>
          <h4 className='mb-4 flex items-center gap-2'>
            <Calendar className='stroke-slate-500' />
            Joined{' '}
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              year: 'numeric',
            }).format(new Date(createdAt))}
          </h4>
          <div className='flex items-center gap-4'>
            <FollowingButton userName={userName} />
            <FollowersButton userName={userName} />
          </div>
        </div>
        {!session?.user || !user || !isOwnProfile ? (
          <>
            <div className='col-start-1 row-start-3 ml-auto mr-4 mt-4 h-fit w-fit text-black'>
              <IsFollowingComponent user={user} />
            </div>
          </>
        ) : (
          <EditProfile user={user} />
        )}
      </div>
    </>
  );
};

export default ProfileInfo;
