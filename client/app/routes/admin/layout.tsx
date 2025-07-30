import { Outlet } from "react-router";
import { useRoleAccess } from "~/hooks/useRoleAccess";

import Sidebar from "~/components/sidebar";
import Appbar from "~/components/appbar";

const AdminLayout = () => {
  const hasAccess = useRoleAccess(["admin"]);

  return (
    hasAccess && (
      <div className="flex items-stretch justify-start min-h-screen max-w-screen">
        <Sidebar isOpen className="shrink-0" />
        <main className="flex-1 min-w-0">
          <Appbar />
          <Outlet />
        </main>
      </div>
    )
  );
};

export default AdminLayout;
