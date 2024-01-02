import { TComment, TInfiniteResponse, TTweet } from '@/types/db';
import axios from '@/libs/axios';

type InfiniteQuery = {
  pageParam?: string;
  signal?: AbortSignal;
};

export const getTweets = async ({
  pageParam = '0',
  signal,
}: InfiniteQuery): Promise<TInfiniteResponse<TTweet[]>> => {
  const res = await axios.get<TInfiniteResponse<TTweet[]>>(
    `/tweet?cursor=${pageParam}`,
    { signal },
  );

  return res.data;
};

type postTweetProps = {
  body: string;
  userId: string;
};

export const postTweet = async ({ body, userId }: postTweetProps) => {
  await axios.post('/tweet', {
    body,
    userId,
  });
};

type deleteTweetProps = {
  ownerId: string;
  tweetId: string;
};

export const deleteTweet = async ({ ownerId, tweetId }: deleteTweetProps) => {
  await axios.delete(`/tweet/${tweetId}`, { data: { ownerId } });
};
type getTweetsFromUserProps = InfiniteQuery & { userName: string };

export const getTweetsFromUser = async ({
  pageParam = '0',
  signal,
  userName,
}: getTweetsFromUserProps): Promise<TInfiniteResponse<TTweet[]>> => {
  const res = await axios.get<TInfiniteResponse<TTweet[]>>(
    `/user/${userName}/tweets?cursor=${pageParam}`,
    { signal },
  );

  return res.data;
};

type getTweetProps = {
  signal?: AbortSignal;
  tweetId: string;
};

export const getTweet = async ({
  signal,
  tweetId,
}: getTweetProps): Promise<TTweet> => {
  const res = await axios.get<TTweet>(`/tweet/${tweetId}`, { signal });

  return res.data;
};

type getCommentsFromTweetProps = InfiniteQuery & {
  signal?: AbortSignal;
  tweetId: string;
};

export const getCommentsFromTweet = async ({
  signal,
  tweetId,
  pageParam = '0',
}: getCommentsFromTweetProps): Promise<TInfiniteResponse<TComment[]>> => {
  const res = await axios.get<TInfiniteResponse<TComment[]>>(
    `/tweet/${tweetId}/comments?cursor=${pageParam}`,
  );

  return res.data;
};

type toogleLikeProps = {
  signal?: AbortSignal;
  tweetId: string;
  userId: string;
};

export const likeTweet = async ({
  signal,
  tweetId,
  userId,
}: toogleLikeProps) => {
  await axios.put<TTweet>(`/tweet/${tweetId}/like`, { signal, userId });
};
export const unlikeTweet = async ({
  signal,
  tweetId,
  userId,
}: toogleLikeProps) => {
  await axios.put<TTweet>(`/tweet/${tweetId}/unlike`, { signal, userId });
};

type CommentTweetProps = getTweetProps & { body: string; ownerId: string };

export const commentTweet = async ({
  tweetId,
  signal,
  body,
  ownerId,
}: CommentTweetProps) =>
  await axios.post<TTweet>(`/tweet/${tweetId}/comments`, {
    signal,
    data: { body, ownerId },
  });
