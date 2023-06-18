import { RouteProps } from "@/utils/routes";
import Link from "next/link";

type SidebarItemProps = RouteProps;

const SidebarItem = ({
  icon: Icon,
  label,
  route,
  isLogo,
}: SidebarItemProps) => {
  return (
    <Link
      href={route}
      className={`flex items-center justify-center mb-4 p-2 w-fit rounded-full  hover:bg-gray-600 ${
        label ? "gap-2" : ""
      }`}
    >
      <Icon size={28} className={`${isLogo ? "text-sky-500" : ""}`} />
      <span className="capitalize hidden md:block">{label}</span>
    </Link>
  );
};

export default SidebarItem;
