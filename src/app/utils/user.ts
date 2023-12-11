import axios from '@/libs/axios';
import { TUser, TUserProfile } from '@/types/db';
import { TForm } from '../components/Profile/EditProfile';

type AxiosSignal = {
  signal?: AbortSignal;
};

type UserNameProps = {
  userName: string;
} & AxiosSignal;

export const getUserData = async ({
  userName,
  signal,
}: UserNameProps): Promise<TUserProfile> => {
  const res = await axios.get<TUserProfile>(`/user/${userName}`, { signal });

  return res.data;
};
export const getCurrentUserData = async ({
  userName,
  signal,
}: UserNameProps): Promise<TUserProfile> => {
  const res = await axios.get<TUserProfile>(`/user/${userName}/current`, {
    signal,
  });

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

export const getUserFollowing = async ({
  userName,
  signal,
}: UserNameProps): Promise<{ data: TUser[] }> => {
  const res = await axios.get(`/user/${userName}/following`, { signal });

  return res.data;
};
export const getUserFollowers = async ({
  userName,
  signal,
}: UserNameProps): Promise<{ data: TUser[] }> => {
  const res = await axios.get(`/user/${userName}/followers`, { signal });

  return res.data;
};

type followProps = UserNameProps & {
  id: string;
};

export const followUser = async ({ userName, signal, id }: followProps) => {
  await axios.put(`/user/${userName}/current`, {
    signal,
    data: { id, action: 'follow' },
  });
};

export const unfollowUser = async ({ userName, signal, id }: followProps) => {
  await axios.put(`/user/${userName}/current`, {
    signal,
    data: { id, action: 'unfollow' },
  });
};
