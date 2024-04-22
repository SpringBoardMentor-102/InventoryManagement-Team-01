import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    function checkEmail(){
        let email=document.getElementById("email").value;
        let error=document.getElementById("error");
    
        if(email.length===0 ){
            error.textContent="**please enter valid email**";
                }
            else if(email !== "abc@gmail.com" ){
                error.textContent="**email don't exist**";
            }
            else{
                window.location.href='/reset';
            }
    
        }
  return (
    <>
    <div className="container">
        <h1>Forgot Password</h1>
    
       
        
        <form id="form" action="/">
            <div className="input-control">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="text" autoComplete='off'/>
                <div id="error"></div>
            </div>
           
          
            <input className="submit-button" type="button" value="Reset Password"  onClick={checkEmail} />
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