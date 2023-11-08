import useServerSession from "@/hooks/useServerSession";
import SidebarLink from "./SidebarLink";
import { links } from "./const/links";
import SidebarTweet from "./SidebarTweet";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Sidebar = async () => {
  const session = await useServerSession();
  return (
    <aside className="grid h-full w-fit shrink-0 items-start gap-4 py-2 pr-4">
      {links.map(({ label, icon, href, className, isPrivate }) =>
        (isPrivate && session) || !isPrivate ? (
          <SidebarLink
            key={href}
            label={label}
            icon={icon}
            href={label === "profile" ? `/${session?.user.userName}` : href}
            className={className}
          />
        ) : null,
      )}
      {session ? (
        <>
          <SignOut />
          <SidebarTweet userId={session.user.id} />
        </>
      ) : (
        <SignIn />
      )}
    </aside>
  );
};

export default Sidebar;
