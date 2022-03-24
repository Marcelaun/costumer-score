import React from 'react';
import './NotLoggedIn.css';
import { Link } from 'react-router-dom';


const NotLoggedIn = () => {

  return (
    <div className="not-logged-in-container">
     <div className="not-logged-in">
       <h3>You're not logged in!</h3>
       <h3>Please log-in <Link to="/login" className="link-to-login" >Here</Link></h3>
     </div>
    </div>
  );
};

export default NotLoggedIn;