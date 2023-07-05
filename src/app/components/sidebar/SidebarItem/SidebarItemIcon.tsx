import { HTMLAttributes } from "react";
import { IconType } from "react-icons";

interface SidebarItemIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconType;
}

const SidebarItemIcon = ({ icon: Icon, ...rest }: SidebarItemIconProps) => {
  return (
    <div>
      <Icon size={28} className={rest.className} />
    </div>
  );
};

export default SidebarItemIcon;
