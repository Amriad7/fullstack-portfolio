import { signOut } from "~/lib/auth-client";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";

const signOutUser = async () => {
  const { error } = await signOut();
  if (error) toast.error(error.message);
};

const SignOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    signOutUser();
    navigate("/", { replace: true });
  }, [navigate]);

  return;
};

export default SignOut;
