import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarItemRootProps extends LinkProps {
  children: ReactNode;
  className?: React.ComponentProps<"a">["className"];
}

const SidebarItemRoot = ({
  children,
  href,
  className,
}: SidebarItemRootProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex items-center justify-center mb-4 p-2 w-fit rounded-full hover:bg-gray-600 lg:px-4 gap-2",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default SidebarItemRoot;
