import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import './style.css'; // Assuming this is the CSS file used for login styling

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="logout-container">
      <h1>Are you sure you want to logout from the application ?</h1>
      <Button type="primary" onClick={() => {
        localStorage.removeItem('token'); // Adjust based on your auth token storage
        navigate('/login')
        message.destroy();
        message.success('Logout successful');

        }}>
        Confirm
      </Button>
    </div>
  );
};

export default Logout;
