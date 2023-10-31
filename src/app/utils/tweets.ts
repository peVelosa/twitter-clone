import { TInfiniteResponse, TTweet } from "@/types/db";
import axios from "axios";

type RQProps = {
  pageParam?: string;
  signal?: AbortSignal;
};

export const getTweets = async ({ pageParam = "0", signal }: RQProps) => {
  const res = await axios.get<TInfiniteResponse<TTweet[]>>(
    `https://pevelosa-twitter-test.vercel.app/tweet?cursor=${pageParam}`,
    { signal },
  );

  return res.data;
};

type postTweetProps = {
  body: string;
  userId: string;
};

export const postTweet = async ({ body, userId }: postTweetProps) => {
  return (
    await axios.post("https://pevelosa-twitter-test.vercel.app/tweet", {
      body,
      userId,
    })
  ).data;
};
