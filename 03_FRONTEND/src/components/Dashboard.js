import React, { useState }  from 'react'

import ProductList from './ProductList';
import Sidebar from './Sidebar';
import Search from './Search';

const Dashboard = () => {
  
  
  return (
    <body id="dashboard-page-body">
    <div className="dash-container">

   <Sidebar/>

        <main>
        <div>
        <ProductList/>
        </div>
        </main>
    </div>
    </body>
  )
}

export default Dashboard;
