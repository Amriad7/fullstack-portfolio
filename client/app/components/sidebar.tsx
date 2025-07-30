import {
  ChartPie,
  FileText,
  Mail,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "./logo";
import { H3 } from "./ui/typography";
import Fancy from "./ui/typography/fancy";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

export const items = [
  {
    name: "Dashboard",
    path: "",
    icon: <ChartPie />,
  },
  {
    name: "Posts",
    path: "posts",
    icon: <FileText />,
  },
  {
    name: "Media",
    path: "media",
    icon: <Image />,
  },
  {
    name: "Messages",
    path: "messages",
    icon: <Mail />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: <Settings />,
  },
];

const Sidebar = ({
  isOpen = true,
  className,
  ...props
}: React.ComponentProps<"aside"> & { isOpen?: boolean }) => {
  return (
    <aside
      className={cn(
        "flex flex-col items-stretch justify-between gap-6 px-2 py-4 border-r",
        isOpen ? "w-3xs" : "w-14",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <Logo />
        {isOpen && (
          <H3 className="text-xl">
            <Fancy>Amriad</Fancy>
          </H3>
        )}
      </div>
      <ul className="flex-1 space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <NavLink
              end={!item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 p-2.5 rounded-sm text-muted-foreground",
                  isActive &&
                    "text-primary bg-gradient-to-r from-indigo-600/20 to-transparent"
                )
              }
            >
              {item.icon}
              {isOpen && item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div>
        <NavLink
          to="#"
          className="flex items-center gap-4 p-2.5 rounded-sm text-muted-foreground"
        >
          <LogOut />
          {isOpen && "Logout"}
        </NavLink>
      </div>
    </aside>
  );
};
export default Sidebar;
