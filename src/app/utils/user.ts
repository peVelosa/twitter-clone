import axios from "@/libs/axios";
import { TUserProfile } from "@/types/db";

type getUserByUserNameProps = {
  userName: string;
  signal?: AbortSignal;
};

export const getUserData = async ({
  userName,
  signal,
}: getUserByUserNameProps): Promise<TUserProfile> => {
  const res = await axios.get<TUserProfile>(`/user/${userName}`, { signal });

  return res.data;
};
