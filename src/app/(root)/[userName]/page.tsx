import { getUserByUserName } from "@/app/utils/user";
import type { FC } from "react";

type ProfilePageProps = {
  params: { userName: string };
};

const ProfilePage: FC<ProfilePageProps> = async ({ params: { userName } }) => {
  const data = await getUserByUserName({
    userName,
    signal: new AbortController().signal,
  });

  return <div>{JSON.stringify(data.info.id)}</div>;
};

export default ProfilePage;
