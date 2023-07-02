import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemLabelProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

const SidebarItemLabel = ({ label, ...rest }: SidebarItemLabelProps) => {
  return (
    <span className={twMerge("capitalize hidden md:block", rest.className)}>
      {label}
    </span>
  );
};

export default SidebarItemLabel;
