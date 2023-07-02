import { SidebarItem } from "./SidebarItem/index";
import { FaUser, FaBell, FaHome, FaTwitter } from "react-icons/fa";
import SidebarTweet from "./SidebarTweet";

const Sidebar = () => {
  return (
    <aside className="shrink-0 px-1 py-2">
      <SidebarItem.Root href={""} className={"lg:py-4"}>
        <SidebarItem.Icon icon={FaTwitter} className={"fill-sky-500"} />
      </SidebarItem.Root>

      <SidebarItem.Root href={"/"}>
        <SidebarItem.Icon icon={FaHome} />
        <SidebarItem.Label label="home" />
      </SidebarItem.Root>

      <SidebarItem.Root href={"/notifications"}>
        <SidebarItem.Icon icon={FaBell} />
        <SidebarItem.Label label="notifications" />
      </SidebarItem.Root>

      <SidebarItem.Root href={"/profile"}>
        <SidebarItem.Icon icon={FaUser} />
        <SidebarItem.Label label="profile" />
      </SidebarItem.Root>

      <SidebarTweet />
    </aside>
  );
};

export default Sidebar;
