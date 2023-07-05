"use client";
import { SidebarItem } from "./SidebarItem/index";
import {
  FaUser,
  FaBell,
  FaHome,
  FaTwitter,
  FaFeatherAlt,
} from "react-icons/fa";
import newTweet from "@/app/callers/tweet/new";

const Sidebar = () => {
  return (
    <aside className="shrink-0 px-1 py-2">
      <SidebarItem.Root className={"lg:py-4"}>
        <SidebarItem.Link href={""}>
          <SidebarItem.Icon
            icon={FaTwitter}
            className={"fill-sky-500"}
          />
        </SidebarItem.Link>
      </SidebarItem.Root>

      <SidebarItem.Root>
        <SidebarItem.Link href={"/"}>
          <SidebarItem.Icon icon={FaHome} />
          <SidebarItem.Label label="home" />
        </SidebarItem.Link>
      </SidebarItem.Root>

      <SidebarItem.Root>
        <SidebarItem.Link href={"/notifications"}>
          <SidebarItem.Icon icon={FaBell} />
          <SidebarItem.Label label="notifications" />
        </SidebarItem.Link>
      </SidebarItem.Root>

      <SidebarItem.Root>
        <SidebarItem.Link href={"/profile"}>
          <SidebarItem.Icon icon={FaUser} />
          <SidebarItem.Label label="profile" />
        </SidebarItem.Link>
      </SidebarItem.Root>

      <SidebarItem.Root className="w-full">
        <SidebarItem.Button
          className="hover:bg-sky-400 bg-sky-500 w-full"
          onClick={() => {
            newTweet({ message: "oi" });
          }}
        >
          <SidebarItem.Icon
            icon={FaFeatherAlt}
            className={"md:hidden"}
          />
          <SidebarItem.Label
            label="Tweet"
            className={"hidden md:block"}
          />
        </SidebarItem.Button>
      </SidebarItem.Root>
    </aside>
  );
};

export default Sidebar;
