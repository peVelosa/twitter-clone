import PageTitle from "@/app/components/PageTitle";
import { getUserData } from "@/app/utils/user";
import ClientProfilePage from "./ClientProfilePage";
import { getTweetsFromUser } from "@/app/utils/tweets";
import type { FC } from "react";

type ProfilePageProps = {
  params: { userName: string };
};

const ProfilePage: FC<ProfilePageProps> = async ({ params: { userName } }) => {
  const user = await getUserData({
    userName,
    signal: new AbortController().signal,
  });

  const tweets = await getTweetsFromUser({ userName });

  return (
    <>
      <div className="isolate">
        <PageTitle title={user.name} />
        <ClientProfilePage
          user={user}
          initialTweetData={tweets}
        />
      </div>
    </>
  );
};

export default ProfilePage;
