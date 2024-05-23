import React ,{useEffect, useState} from 'react'
import { Link ,navigate} from 'react-router-dom'


const NotFound = () => {
  
  const [dashboardNavigate, setdashboardNavigate] = useState("");

useEffect(()=>{
  const role = JSON.parse(localStorage.getItem("user")).role;

// if login as a user 
      if (role === 0) {
        setdashboardNavigate("/dashboard");
      } else if (role === 1) {  // if login as a Admin 
        setdashboardNavigate("/AdminDashboard");
      }
},[]);

  return (
    <div>
    <div className='Not-found'>
        <h1 className="error-heading_404">404 - Page Not Found</h1>
        <p className="error-message_404">Oops! The page you are looking for could not be found.</p>
        <Link  to={dashboardNavigate} className="button_404">Go to Home Page</Link>
    </div>
    </div>
  )
}

export default NotFound
