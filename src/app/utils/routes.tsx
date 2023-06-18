import { FaUser, FaBell, FaHome, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";

export type RouteProps = {
  label?: string;
  route: string;
  icon: IconType;
  isLogo?: true
};

export const ROUTES: RouteProps[] = [
  {
    label: "",
    route: "/",
    icon: FaTwitter,
    isLogo:true
  },
  {
    label: "home",
    route: "/",
    icon: FaHome,
  },
  {
    label: "notification",
    route: "/notification",
    icon: FaBell,
  },
  {
    label: "profile",
    route: "/profile",
    icon: FaUser,
  },
];
