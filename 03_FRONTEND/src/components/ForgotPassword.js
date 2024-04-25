import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const ForgotPassword = () => {
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  

  const emailVerification=async()=>{
    try{
      const response = await axios.post('http://localhost:5000/api/users/check-email',{email});
      if (response.data.exists){
        window.location.href='/reset';
      }else {
        if(email === ""){
          setMessage("please enter email");
        }else{
          setMessage('email does not exists');

        }
      }
    }catch(error){
      console.error('error verifying email : ', error);
      setMessage('error verifying email. please try again later ');
    }
  };


  return (
    <>
    <div className="container">
        <h1>Forgot Password</h1>
    
       
        
        <form id="form" >
            <div className="input-control">
                <div style={{fontSize:"15px", color: "red"}}>{message}</div>
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="text"onChange={(e)=> setEmail(e.target.value)} autoComplete='off'/>
            </div>
           
          
            <input className="submit-button" type="button" value="Reset Password" onClick={emailVerification} />
          <div className="links" style={{clear: 'both', textAlign: 'center'}}>
           <p>Already have an account ? <Link to="/signin">Sign In</Link></p> 
         <p>Don't have an account yet? <Link to="/signup">Create account</Link></p>   
          </div>
        </form>
        
        
      </div>
    </>
  )
}

export default ForgotPassword;
