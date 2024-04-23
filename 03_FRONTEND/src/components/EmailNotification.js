import React from 'react';
import { Link } from 'react-router-dom';

const EmailNotification = () => {
    return (
      <div className="email_container">
        <h2 className='h1'>Oops! It seems like you not checked your Email</h2>
        <p className='email_p'>To access your account, please take a moment to check your Email</p>
        <p className='email_p'>If you didn't get mail please go through following points:</p>
        <ul className='flex_vertically'>
          <li><b>Complete Form:</b>Ensure all required fields are filled out accurately.</li>
          <li><b>Verify Email:</b> Check your inbox for a verification email and click the link provided.</li>
          <li><b>Agree to Terms:</b> Review and accept our terms and conditions.</li>
          <li><b>Need Assistance?:</b> Don't hesitate to reach out to our support team if you need help.</li>
        </ul>
        <p className='email_p'>Thank you for choosing us. We look forward to having you fully onboarded!</p>
  
        <Link  to="/SignUp" className="button_EmailNotification"><button type="submit">Complete Your Registeration</button></Link>
      </div>
    );
}

export default EmailNotification
