export type TInfiniteResponse<T> = {
  data: T;
  cursor: string;
  _count: number;
};

export type TUser = {
  id: string;
  name: string;
  image?: string;
  userName: string;
};

export type TTweet = {
  id: string;
  body: string;
  owner: TUser;
  likes: { id: string }[];
  _count: { comments: number; likes: number };
};

export type TUserProfile = TUser & {
  background?: string;
  createdAt: string;
  followedBy: { id: string }[];
  following: { id: string }[];
};
