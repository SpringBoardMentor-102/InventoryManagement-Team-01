import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import img1 from "../../images/logo.png";
const Sidebar = () => {
  const navigate = useNavigate();

  // get the current location
  const location = useLocation();
  const activeLink = location.pathname;
  console.log("This is the activeLink: ", activeLink);

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Remove user data from localStorage
    localStorage.removeItem("user");
    navigate("/signin");
  };

    // getting the role value 
    const role = JSON.parse(localStorage.getItem("user")).role;

    const admin = role?false :true;

  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src={img1} alt="" />
          <h2>
            INFO <span className="danger">SYS</span>
          </h2>
        </div>

        <div className="close" id="close-btn">
          <span className="material-icons-sharp">close</span>
        </div>
      </div>

      {/* note : a link shouldbe converted to LINK  */}
      <button onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isOpen && (
        <div className="sidebar">
          <a href="/" className={activeLink === "/dashboard" ? "active" : ""}>
            <span className="material-icons-sharp">grid_view</span>
            <h3>Dashboard</h3>
          </a>
          <a
            href="/"
            className={activeLink.startsWith("/product/") ? "active" : ""}
          >
            <span className="material-icons-sharp">details</span>
            <h3>Product</h3>
          </a>
          <Link
            to="/history"
            className={activeLink === "/history" ? "active" : ""}
          >
            <span className="material-icons-sharp">history</span>
            <h3>History</h3>
          </Link>
          {admin? ( <Link
            to="/checkout"
            className={activeLink === "/checkout" ? "active" : ""}
          >
            <span className="material-icons-sharp">add_shopping_cart</span>
            <h3>Checkout</h3>
          </Link>):( <a href="/adminproduct">
            <span className="material-icons-sharp">shopping_cart</span>
            <h3>Manage Product</h3>
          </a>)}
         

          {admin? (<a href="/help">
            <span className="material-icons-sharp">manage_accounts</span>
            <h3>Help Center</h3>
          </a>):( <a href="/Reports">
            <span className="material-icons-sharp">summarize</span>
            <h3>Reports</h3>
          </a>)}
          
          <a href="/" onClick={handleLogout}>
            <span className="material-icons-sharp">logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
