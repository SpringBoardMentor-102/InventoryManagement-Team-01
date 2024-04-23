import React from 'react'
import img1 from "../images/logo.png"
import prof_1 from "../images/profile-1.jpg"
import prof_2 from "../images/profile-2.jpg"
import prof_3 from "../images/profile-3.jpg"
import prof_4 from "../images/profile-4.jpg"
import rand_1 from "../images/Random_photo.jpg"
import rand_2 from "../images/Randomphoto1.jpg"


const Dashboard = () => {
  return (
    <body id="dashboard-page-body">
    <div class="dash-container">
        <aside>
            <div className="top">
                <div className="logo">
                    <img src={img1} alt=""/>
                    <h2>INFO <span className="danger">SYS</span></h2>
                </div>
                <div className="close" id="close-btn">
                    <span className="material-icons-sharp">close</span>                
                    </div>
            </div>

            {/* note : a link shouldbe converted to LINK  */}
            <div className="sidebar">
                <a href="#">
                    <span className="material-icons-sharp">grid_view</span>
                    <h3>Dashboard</h3>
                </a>
                <a href="#" className="active">
                    <span className="material-icons-sharp">inventory</span>
                    <h3>Inventory</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">summarize</span>
                    <h3>Reports</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">shopping_basket</span>
                    <h3>Suppliers</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">reorder</span>
                    <h3>Orders</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">manage_accounts</span>
                    <h3>Manage Store</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">add_shopping_cart</span>
                    <h3>Add Product</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">logout</span>
                    <h3>Logout</h3>
                </a>
            </div>
        </aside>

        {/* // <!-- end of aside --> */}

        <main>
            <h1>Dashboard</h1>
            
            <div className="date">
                <input type="date"/>
            </div>

            <div className="insights">
                <div className="sales">
                    <span className="material-icons-sharp">analytics</span>
                    <div className="middle">
                        <div class="left">
                            <h3>Total Sales</h3>
                            <h1>Rs 25,000</h1>
                        </div>
                    <div className="progress">
                        <svg>
                            <circle cx='38' cy='38' r='36'></circle>
                        </svg>
                        <div className="number">
                            <p>81%</p>
                        </div>
                    </div>                        
                    </div>
                    <small className="text-muted">Last 24 Hours</small>
                </div>
                {/* <!-- End of sales --> */}

                <div className="expenses">
                    <span className="material-icons-sharp">bar_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Total Expenses</h3>
                            <h1>Rs 15,000</h1>
                        </div>
                    <div className="progress">
                        <svg>
                            <circle cx='38' cy='38' r='36'></circle>
                        </svg>
                        <div className="number">
                            <p>62%</p>
                        </div>
                    </div>                        
                    </div>
                    <small className="text-muted">Last 24 Hours</small>
                </div>
                {/* <!-- End of expenses --> */}
                <div className="income">
                    <span className="material-icons-sharp">stacked_line_chart</span>
                    <div className="middle">
                        <div className="left">
                            <h3>Total Income</h3>
                            <h1>Rs 10,000</h1>
                        </div>
                    <div className="progress">
                        <svg>
                            <circle cx='38' cy='38' r='36'></circle>
                        </svg>
                        <div className="number">
                            <p>40%</p>
                        </div>
                    </div>                        
                    </div>
                    <small className="text-muted">Last 24 Hours</small>
                </div>
                {/* <!-- End of Income --> */}
            </div>
            {/* <!-- End of Insights --> */}

            <div className="recent-orders">
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Number</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Refrigerator</td>
                            <td>10,000</td>
                            <td>Due</td>
                            <td className="warning">Pending</td>
                            <td className="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Refrigerator</td>
                            <td>10000</td>
                            <td>Due</td>
                            <td className="warning">Pending</td>
                            <td className="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Refrigerator</td>
                            <td>10000</td>
                            <td>Due</td>
                            <td className="warning">Pending</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Refrigerator</td>
                            <td>10000</td>
                            <td>Due</td>
                            <td className="warning">Pending</td>
                            <td className="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Refrigerator</td>
                            <td>10000</td>
                            <td>Due</td>
                            <td className="warning">Pending</td>
                            <td className="primary">Details</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
        </main>
        {/* <!-- End of Main --> */}

        <div className="right">
            <div className="top">
                <button id="menu-btn">
                    <span className="material-icons-sharp">menu</span>
                </button>
                <div className="theme-toggler">
                    <span className="material-icons-sharp active">light_mode</span>
                    <span className="material-icons-sharp">dark_mode</span>
                </div>
                <div className="profile">
                    <div className="info">
                        <p>Hey, <b>Aman</b></p>
                        <small className="text-muted">Admin</small>
                    </div>
                    <div className="profile-photo">
                        <img src={rand_2} alt=""/>
                    </div>
                </div>
            </div>
            <div className="recent-updates">
                <h2>Recent Updates</h2>
                <div className="updates">
                    <div className="update">
                        <div className="profile-photo">
                            <img src={prof_2} id="profile"  alt=""/>
                        </div>
                        <div className="message">
                            <p><b>Vaibhav</b> received his Refrigerator</p>
                            <small className="text-muted">2 Minutes Ago</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile-photo">
                            <img src={prof_3} alt=""/>
                        </div>
                        <div className="message">
                            <p><b>Lipika</b> received her Refrigerator</p>
                            <small className="text-muted">2 Minutes Ago</small>
                        </div>
                    </div>
                    <div className="update">
                        <div className="profile-photo">
                            <img src={prof_4} alt=""/>
                        </div>
                        <div className="message">
                            <p><b>Nancy</b> received her Refrigerator</p>
                            <small className="text-muted">2 Minutes Ago</small>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End of recent updates --> */}
            <div className="sales-analytics">
                <h2>Sales Analytics</h2>
                <div className="item online">
                    <div className="icon">
                    <span className="material-icons-sharp">shopping_cart</span>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Online Orders</h3>
                            <small className="text-muted">Last 24 Hours</small>
                        </div>
                        <h5 className="success">+40%</h5>
                        <h3>4,000</h3>
                    </div>
                </div>
                <div className="item offline">
                    <div className="icon">
                    <span className="material-icons-sharp">local_mall</span>
                    </div>
                    <div class="right">
                        <div className="info">
                            <h3>Offline Orders</h3>
                            <small className="text-muted">Last 24 Hours</small>
                        </div>
                        <h5 className="danger">-17%</h5>
                        <h3>1,100</h3>
                    </div>
                </div>
                <div className="item customers">
                    <div className="icon">
                    <span className="material-icons-sharp">person</span>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>New Customers</h3>
                            <small className="text-muted">Last 24 Hours</small>
                        </div>
                        <h5 className="success">+25%</h5>
                        <h3>800</h3>
                    </div>
                </div>
                <div className="item add-product">
                    <div>
                        <span className="material-icons-sharp">add</span>
                        <h3>Add Product</h3>
                    </div>
                </div>
        </div>
    </div>
    </div>
    </body>
  )
}

export default Dashboard;
