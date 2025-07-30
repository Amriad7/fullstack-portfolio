import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSession } from "~/lib/auth-client";

export const useRoleAccess = (roles: string[], redirectTo: string = "/") => {
  const navigate = useNavigate();
  const { data, isPending } = useSession(); // async + reactive!
  const hasAccess = data && roles.includes(data.user.role);

  useEffect(() => {
    // redirect if = not(waiting for res) && not(user is admin)
    if (!isPending && !hasAccess) {
      navigate(redirectTo);
    }
  }, [data, isPending]);

  return !!hasAccess;
};
