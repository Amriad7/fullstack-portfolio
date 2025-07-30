import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

const items = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contacts", path: "/contacts" },
];

type NavMenuProps = React.ComponentProps<"nav"> & {
  orientation?: "horizontal" | "vertical";
  onItemClick?: () => void;
};

const NavMenu = ({ orientation, onItemClick, ...props }: NavMenuProps) => {
  return (
    <nav {...props}>
      <ul
        className={cn(
          "flex items-center justify-between gap-4 text-muted-foreground",
          orientation === "vertical" && "flex-col"
        )}
      >
        {items.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                cn(
                  "p-2",
                  isActive && "dark:text-gray-50 text-foreground font-semibold"
                )
              }
              onClick={onItemClick}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavMenu;
