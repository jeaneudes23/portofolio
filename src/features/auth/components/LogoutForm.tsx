import { Button } from "@/components/ui/button";
import { logout } from "../server-actions/auth-server-actions";

export const LogoutForm = () => {
  return (
    <form action={logout}>
      <Button variant={"accent"}>Logout</Button>
    </form>
  );
};
