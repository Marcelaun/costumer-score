import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/login');
  }


  return (
    <header className="header">
    <h2>Obrigado Por Avaliar!</h2>
    <button onClick={redirectToLogin} className="log-in-btn">Entrar no dashboard</button>
  </header>
  )
}

export default Header