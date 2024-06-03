import { useState } from "react";
import { AdminLayout } from "../components/layout";
import AdminBook from "../components/admin_book";
import AdminOrder from "../components/admin_order";
import AdminRank from "../components/admin_rank";
import AdminUser from "../components/admin_user";
import AdminNavBar from "../components/admin_navbar";

export default function AdminPage() {
  const [currentComponent, setCurrentComponent] = useState("AdminUser");

  const components = {
    AdminUser: <AdminUser />,
    AdminOrder: <AdminOrder />,
    AdminRank: <AdminRank />,
    AdminBook: <AdminBook />,
  };

  return (
    <AdminLayout
      header={
        <AdminNavBar
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
        />
      }
    >
      {components[currentComponent]}
    </AdminLayout>
  );
}
