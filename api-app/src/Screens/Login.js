import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
       navigate('/Products')
    } else {
      alert("Nieprawidłowe dane logowania!")
    }
  };

  return (
    <div className='container'>
    <div className='row min-vh-100'>
      <div className='col d-flex flex-column justify-content-center align-items-center'>
        <h1>Log In! </h1>             
                  <input className='form-control mb-4 mt-4' type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                  <input className='form-control' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <button className = 'btn btn-lg btn-success mt-4' onClick={handleLogin}>Log in</button>        
      </div>
    </div>    
  </div>
  );
};

export default Login;

