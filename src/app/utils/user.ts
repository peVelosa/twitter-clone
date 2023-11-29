import axios from '@/libs/axios';
import { TUserProfile } from '@/types/db';
import { TForm } from '../components/Profile/EditProfile';

type AxiosSignal = {
  signal?: AbortSignal;
};

type getUserByUserNameProps = {
  userName: string;
} & AxiosSignal;

export const getUserData = async ({ userName, signal }: getUserByUserNameProps): Promise<TUserProfile> => {
  const res = await axios.get<TUserProfile>(`/user/${userName}`, { signal });

  return res.data;
};

type updateUser = TForm & { originalUserName: string } & AxiosSignal;
export const updateUser = async ({
  originalUserName,
  userName,
  background,
  email,
  image,
  name,
  signal,
}: updateUser): Promise<void> => {
  await axios.put<TForm>(`/user/${originalUserName}`, {
    data: { userName, background, email, image, name },
    signal,
  });
};

export const getUserFollowing = async ({ userName, signal }: getUserByUserNameProps) => {
  const res = await axios.get(`/user/${userName}/following`, { signal });

  return res.data;
};
export const getUserFollowers = async ({ userName, signal }: getUserByUserNameProps) => {
  const res = await axios.get(`/user/${userName}/followers`, { signal });

  return res.data;
};
