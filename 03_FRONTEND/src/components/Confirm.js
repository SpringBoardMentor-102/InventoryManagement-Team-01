import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

// Getting the path from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Confirm = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Extracting token from URL params

  const [tokenError, setTokenError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Confirm email when component mounts
    handleConfirm();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleConfirm = async () => {
    try {
          // taking token from URL Params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);
      const response = await axios.get(`${BACKEND_URL}/users/confirm-email?token=${token}`);
      console.log(response.data);
      setIsConfirmed(true);
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      console.error('Confirmation error:', error.response.data);
      // Handle different error responses as needed
      if (error.response.status === 404) {
        setTokenError('Invalid or expired token');
      } else {
        setTokenError('Internal Server Error');
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Email Confirmation</h1>
        {isConfirmed ? (
          <div className="confirmation-message">
            <FaCheckCircle size={30} color="green" />
            <p>Email confirmed successfully!</p>
          </div>
        ) : (
          <div className="error_sign_up">
            {tokenError || 'Verifying email...'}
          </div>
        )}
      </div>
    </>
  );
};

export default Confirm;
