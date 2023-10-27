import useServerSession from "@/hooks/useServerSession";
import SidebarLink from "./SidebarLink";
import { links } from "./const/links";
import Sign from "./Sign";
import SidebarTweet from "./SidebarTweet";

const Sidebar = async () => {
  const session = await useServerSession();
  return (
    <aside className="grid w-fit gap-4 border-r border-neutral-50 pr-4">
      {links.map(({ label, icon, href, className, isPrivate }) =>
        (isPrivate && session) || !isPrivate ? (
          <SidebarLink
            key={href}
            label={label}
            icon={icon}
            href={href}
            className={className}
          />
        ) : null,
      )}
      {session ? (
        <>
          <Sign mode="sign-out" />
          <SidebarTweet userId={session.user.id} />
        </>
      ) : (
        <Sign mode="sign-in" />
      )}
    </aside>
  );
};

export default Sidebar;
