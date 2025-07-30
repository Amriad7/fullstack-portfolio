import { User } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Link } from "react-router";
import { useSession } from "~/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const items = {
  guest: [
    { name: "Sign up", path: "/auth/signup" },
    { name: "Sign in", path: "/auth/signin" },
    { name: "Forgot password", path: "#" },
  ],
  user: [
    { name: "Profile", path: "#" },
    { name: "Comments", path: "#" },
    { name: "Likes", path: "#" },
    { name: "Settings", path: "#" },
    { name: "Signout", path: "/auth/signout" },
  ],
  admin: [
    { name: "Dashboard", path: "/admin" },
    { name: "Posts", path: "/admin/posts" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Signout", path: "/auth/signout" },
  ],
};

type UserRole = "user" | "admin" | "guest";

const UserCard = ({
  user,
}: {
  user:
    | {
        id: string;
        name: string;
        emailVerified: boolean;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
        role: string;
      }
    | undefined;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={user?.image || undefined} />
        <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h5 className="text-foreground">{user?.name}</h5>
        <p className="text-muted-foreground text-xs">{user?.email}</p>
      </div>
    </div>
  );
};

const UserMenu = () => {
  const { data } = useSession();
  const user = data?.user;
  const role = (user?.role as UserRole) || "guest";

  return (
    <div className="inline-flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            {role === "guest" ? (
              <User />
            ) : (
              <Avatar>
                <AvatarImage src={user?.image || undefined} />
                <AvatarFallback>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user && (
            <DropdownMenuLabel className="bg-background mb-2">
              <UserCard user={user} />
            </DropdownMenuLabel>
          )}
          {items[role].map((item) => (
            <DropdownMenuItem key={item.name}>
              <Link to={item.path}> {item.name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserMenu;
