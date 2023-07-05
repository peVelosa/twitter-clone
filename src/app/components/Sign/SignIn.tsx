import { SidebarItem } from "../sidebar/SidebarItem";
import { signIn } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const SignIn = () => {
  return (
    <SidebarItem.Root>
      <SidebarItem.Button onClick={() => signIn()}>
        <SidebarItem.Icon
          icon={FaSignOutAlt}
          className="fill-green-400"
        />
        <SidebarItem.Label
          label="Sign in"
          className={"hidden md:block"}
        />
      </SidebarItem.Button>
    </SidebarItem.Root>
  );
};

export default SignIn;
