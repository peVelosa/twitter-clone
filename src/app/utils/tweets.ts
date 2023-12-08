import { TInfiniteResponse, TTweet } from '@/types/db';
import axios from '@/libs/axios';

type RQProps = {
  pageParam?: string;
  signal?: AbortSignal;
  userName?: string;
};
type postTweetProps = {
  body: string;
  userId: string;
};

export const getTweets = async ({ pageParam = '0', signal }: RQProps): Promise<TInfiniteResponse<TTweet[]>> => {
  const res = await axios.get<TInfiniteResponse<TTweet[]>>(`/tweet?cursor=${pageParam}`, { signal });

  return res.data;
};

export const postTweet = async ({ body, userId }: postTweetProps) => {
  await axios.post('/tweet', {
    body,
    userId,
  });
};

export const getTweetsFromUser = async ({
  pageParam = '0',
  signal,
  userName,
}: RQProps): Promise<TInfiniteResponse<TTweet[]>> => {
  const res = await axios.get<TInfiniteResponse<TTweet[]>>(`/user/${userName}/tweets?cursor=${pageParam}`, { signal });

  return res.data;
};

type TweetProps = {
  signal?: AbortSignal;
  tweetId: string;
};

export const getTweet = async ({ signal, tweetId }: TweetProps): Promise<TTweet> => {
  const res = await axios.get<TTweet>(`/tweet/${tweetId}`, { signal });

  return res.data;
};

type ActionTweetProps = {
  signal?: AbortSignal;
  tweetId: string;
  userId: string;
};

export const likeTweet = async ({ signal, tweetId, userId }: ActionTweetProps) => {
  await axios.put<TTweet>(`/tweet/${tweetId}/like`, { signal, userId });
};
export const unlikeTweet = async ({ signal, tweetId, userId }: ActionTweetProps) => {
  await axios.put<TTweet>(`/tweet/${tweetId}/unlike`, { signal, userId });
};
