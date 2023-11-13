import PageTitle from "@/app/components/PageTitle";
import { getUserData } from "@/app/utils/user";
import type { FC } from "react";
import ClientProfilePage from "./ClientProfilePage";
import { getTweetsFromUser } from "@/app/utils/tweets";
import ImageWithFallback from "@/app/components/ImageWithFallback";

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
        <div className="grid grid-cols-1 grid-rows-[8rem_50px_50px_auto]">
          <div className="col-start-1 row-span-2 row-start-1 bg-slate-300" />
          <ImageWithFallback
            src={user.image}
            width={100}
            height={100}
            alt="user image profile"
            className="z-20 col-start-1 row-span-2 row-start-2 ml-4 aspect-square rounded-full border-4 border-white"
          />

          <ClientProfilePage
            user={user}
            initialTweetData={tweets}
          />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
