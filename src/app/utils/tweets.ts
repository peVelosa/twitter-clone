import axios from "@/libs/axios";
import { TInfiniteResponse, TTweet } from "../types/db";

export const getTweet = async () => {
  return (await axios.get<TInfiniteResponse<TTweet[]>>("/tweet")).data;
};

export const postTweet = async ({ body, userId }) => {
  return (await axios.post("/tweet", { body, userId })).data;
};
