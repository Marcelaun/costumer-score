import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './DashBoard.css';
import { useNavigate } from 'react-router-dom';

import CostumerData from '../../components/CostumerData/CostumerData';


const Dashboard = () => {
  const navigate = useNavigate();
  const { logOutAccount } = useAuth();

  const logOut = async () => {
    await logOutAccount();
    navigate('/login');
  }
  
    return (
      <>
       <div className="dashboard-navbar">
         <h3>DashBoard</h3>
         <button onClick={logOut} className="log-out-btn" >Sair</button>
       </div>
       <CostumerData />
      </>
       
     )

  
}

export default Dashboard