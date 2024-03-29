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
  email: string;
};

export type TTweet = {
  id: string;
  body: string;
  owner: TUser;
  likes: { id: string }[];
  updatedAt: string;
  _count: { comments: number; likes: number };
};

export type TUserProfile = TUser & {
  background?: string;
  createdAt: string;
  followedBy: { id: string }[];
  following: { id: string }[];
};

export type TComment = {
  id: string;
  tweetId: string;
  body: string;
  owner: TUser;
  likes: { id: string }[];
  updatedAt: string;
  _count: { likes: number };
};
