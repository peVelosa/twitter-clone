import type { FC } from "react";

const ProfilePage = ({ params: { userName } }) => {
  return <div>{userName}</div>;
};

export default ProfilePage;
