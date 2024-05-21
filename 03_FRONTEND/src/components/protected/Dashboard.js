
import Search from "./Search";
import Filteroption from "./Filteroption";
import Sidebar from "./Sidebar";
const Dashboard = () => {

  return (
    <div className="dash-container">
      <Sidebar />
      <main>
        <Search />
      </main>
     
    </div>
  );
};

export default Dashboard;
