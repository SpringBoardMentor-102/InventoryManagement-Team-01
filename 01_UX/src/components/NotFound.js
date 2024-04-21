import React from 'react'
import { Link } from 'react-router-dom'


const NotFound = () => {
  return (
    <div>
    <div style={{textAlign: 'center'}}>
        <h1 className="error-heading_404">404 - Page Not Found</h1>
        <p className="error-message_404">Oops! The page you are looking for could not be found.</p>
        <Link  to="/home" className="button_404">Go to Home Page</Link>
    </div>
    </div>
  )
}

export default NotFound