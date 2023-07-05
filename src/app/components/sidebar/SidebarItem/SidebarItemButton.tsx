import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SidebarItemButton = ({
  children,
  className,
  ...rest
}: SidebarItemButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "flex items-center justify-center p-2 lg:px-4 gap-2 w-full",
        className
      )}
    >
      {children}
    </button>
  );
};

export default SidebarItemButton;
