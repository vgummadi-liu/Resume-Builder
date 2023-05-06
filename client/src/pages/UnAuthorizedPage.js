import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorizedErrorPage = () => {
    return (
      <div>
        <h1>401 - Unauthorized</h1>
        <p>You are not authorized to view this page.</p>
        <Link to="/login">Login </Link>
      </div>
    );
  };
  
  export default UnAuthorizedErrorPage;
  

