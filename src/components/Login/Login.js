import React, { useEffect, useState } from 'react';
import './Login.css';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'



const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { logInWithEmailAndPassword, user } = useAuth();

  const showAlertErrors = (errorS) => {
    if(errorS === 'auth/wrong-password') {
      alert.show('Senha errada!', {
        type: 'error'
      })
     } else if(errorS === 'auth/too-many-requests') {
      alert.show('Muitas tentativas! aguarde um instante...', {
        type: 'error'
      })
     }
  }

  const handleSubmitLogin = async (e) => {

    e.preventDefault();

    const userData = {
      email,
      password
    }

    try {
      await logInWithEmailAndPassword(userData);
      navigate('/dashboard');
      setError('noError')
    } catch (error) {
      console.log(error.code)
      setError(error.code);
      showAlertErrors(error.code);
      
      
    }

    

    
    
    
  




  }

  


   if(user) {
    navigate('/dashboard');
   }
  
    return (
      <div className="login-container">
        <div className="login-form-container">
        <div className="login-header">
          Login
        </div>
  
        <form className="login-form" onSubmit={handleSubmitLogin}>
          <input className="user-input" type="email" placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
          <input className="user-input" type="password" placeholder='Senha' onChange={(e) => {setPassword(e.target.value)}} />
          <input className="login-submit-btn" type="submit" value="Entrar" />
        </form>
  
        </div>
      </div>
    )
  

 
}

export default Login