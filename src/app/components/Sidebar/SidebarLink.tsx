import Link from "next/link";
import type { FC } from "react";
import type { LucideIcon } from "lucide-react";

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  className?: React.ComponentProps<"link">["className"];
  label?: string;
};

const SidebarLink: FC<SidebarLinkProps> = ({
  label,
  href,
  className,
  icon: Icon,
}) => {
  return (
    <Link
      className="hover:bg-ghost flex w-fit items-center rounded-full p-2 capitalize"
      href={href}
    >
      <Icon className={className} />
      <span className="ml-4 hidden empty:hidden md:block">{label}</span>
    </Link>
  );
};

export default SidebarLink;
