import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type SidebarItemRootProps = {
  children: ReactNode;
  className?: React.ComponentProps<"div">["className"];
};

const SidebarItemRoot = ({ children, className }: SidebarItemRootProps) => {
  return (
    <div
      className={twMerge(
        "mb-4 w-fit rounded-full hover:bg-gray-600 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SidebarItemRoot;
