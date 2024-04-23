import React from 'react'
import img1 from '../images/conf.png';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';


const Reg_Config = () => {
  return (
    <div class="container">
    <div class="popup">
      <img src={img1} alt=""/>
      <h1>Registration Confirmed!</h1>
      <p>Thank you for registering,</p>
      <p>You can now log in to your account.</p>
      <Link to="/signin">Login Here</Link>
    </div>
  </div>
  )
}

export default Reg_Config