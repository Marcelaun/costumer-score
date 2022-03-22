import React, { useState } from 'react';
import './Login.css';

const Login = () => {

  return (
    <div className="login-container">
      <div className="login-form-container">
      <div className="login-header">
        Login
      </div>

      <form className="login-form">
        <input className="user-input" type="text" placeholder='Usuário' />
        <input className="user-input" type="password" placeholder='Senha' />

        <input className="login-submit-btn" type="submit" value="Entrar"/>
      </form>

      </div>
    </div>
  )
}

export default Login