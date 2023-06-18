import { ROUTES } from "@/utils/routes";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <aside className="shrink-0">
      {ROUTES.map((route) => (
        <SidebarItem
          icon={route.icon}
          label={route.label}
          route={route.route}
          isLogo={route.isLogo}
          key={route.route}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
