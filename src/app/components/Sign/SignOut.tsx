import { SidebarItem } from "../sidebar/SidebarItem";
import { signOut } from "next-auth/react";
import { FaSignInAlt } from "react-icons/fa";

const SignOut = () => {
  return (
    <SidebarItem.Root>
      <SidebarItem.Button onClick={() => signOut()}>
        <SidebarItem.Icon
          icon={FaSignInAlt}
          className="fill-red-500"
        />
        <SidebarItem.Label
          label="Sign out"
          className={"hidden md:block"}
        />
      </SidebarItem.Button>
    </SidebarItem.Root>
  );
};

export default SignOut;
