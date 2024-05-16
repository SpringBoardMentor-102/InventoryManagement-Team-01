import Sidebar from "./Sidebar";
import Search from "./Search";
import Filteroption from "./Filteroption";

const Dashboard = () => {

  return (
    <div className="dash-container">
      <Sidebar />
      <main>
        <Search />
      </main>
      <aside>
        <Filteroption/>
      </aside>
    </div>
  );
};

export default Dashboard;
