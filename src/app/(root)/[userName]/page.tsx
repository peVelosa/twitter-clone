import type { FC } from "react";

type ProfilePageProps = {
  params: { userName: string };
};

const ProfilePage: FC<ProfilePageProps> = ({ params: { userName } }) => {
  return <div>{userName}</div>;
};

export default ProfilePage;
