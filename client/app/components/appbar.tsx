import { Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { H3 } from "./ui/typography";
import { useLocation } from "react-router";
import { items } from "./sidebar";

export const SearchInput = () => {
  return (
    <div className="relative">
      <Input type="search" placeholder="search" className="max-w-xs pl-9" />
      <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
    </div>
  );
};

const Appbar = () => {
  const location = useLocation();
  const route = items.find(
    ({ path }) => path && location.pathname.includes(path)
  );

  return (
    <header className="flex items-center justify-between gap-6 p-4">
      <H3>{route?.name || "Dashboard"}</H3>
      <div className="flex gap-2">
        <SearchInput />
        <Button size="icon" variant="outline">
          <Settings className="fill-foreground" />
        </Button>
        <Button size="icon" variant="outline">
          <User className="fill-foreground" />
        </Button>
      </div>
    </header>
  );
};
export default Appbar;
