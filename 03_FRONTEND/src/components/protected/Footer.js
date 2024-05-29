import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faTwitter,faYoutube,faInstagram} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'

// Footer component
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row"> {/*Social media icons*/}
          <Link to="#"><FontAwesomeIcon icon={faFacebook} size='2x'/></Link>
          <Link to="#"><FontAwesomeIcon icon={faInstagram} size='2x'/></Link>
          <Link to="#"><FontAwesomeIcon icon={faTwitter} size='2x'/></Link>
          <Link to="#"><FontAwesomeIcon icon={faYoutube} size='2x'/></Link> 
        </div>
        
        <div className="row">
          <ul>
            <li><Link to='#' >Contact us</Link></li>
            <li><Link to='#' >Our Services</Link></li>
            <li><Link to='#' >Privacy Policy</Link></li>
            <li><Link to='#' >Terms & Conditions</Link></li>
            <li><Link to='#' >Career</Link></li>
          </ul>
        </div>
        
        {/*Copyright Information*/}
        <div className="row">
          INFO SYS Copyright © 2024 INFO SYS - All rights reserved || Designed By: InventoryMangement Team
        </div>
      </div>
    </footer>
  )
}

export default Footer;