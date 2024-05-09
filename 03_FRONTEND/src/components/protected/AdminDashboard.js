import AdminSidebar from "./AdminSidebar";
import Search from "./Search";

const AdminDashboard = () => {

  return (
    <div className="dash-container">
      <AdminSidebar />
      <main>
        <Search />
      </main>
    </div>
  );
};

export default AdminDashboard;