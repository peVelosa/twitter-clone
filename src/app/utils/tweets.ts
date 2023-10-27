import axios from "@/libs/axios";

export const postTweet = async ({ body, userId }) => {
  await axios.post("/tweet", { body, userId });
};
