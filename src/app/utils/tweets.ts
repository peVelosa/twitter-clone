import axios from "@/libs/axios";
import { TInfiniteResponse, TTweet } from "../types/db";

export const getTweet = async () => {
  return (await axios.get<TInfiniteResponse<TTweet[]>>("/tweet")).data;
};

type postTweetProps = {
  body: string;
  userId: string;
};

export const postTweet = async ({ body, userId }: postTweetProps) => {
  return (await axios.post("/tweet", { body, userId })).data;
};
