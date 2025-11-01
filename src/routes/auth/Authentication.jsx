import React, { useState } from 'react';
import axios from 'axios';
import './auth.css'; 

import Login from './Login';
import Register from './Register';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  
  const [ _switch, set_switch ] = useState(true); 
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    
    const data = {
      username: username,
      password: password
    };

    const BASE_URL = 'http://localhost:8000';

    const url = _switch
      ? `${BASE_URL}/api/auth/login`
      : `${BASE_URL}/api/auth/register`;

    const actionText = _switch ? 'connexion' : 'inscription';

    try {
      const response = await axios.post(url, data);

      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);

      setUserUsername(username);
      setIsLoggedIn(true);

    } catch (error) {
      console.error(`Erreur lors de l'${actionText}:`, error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(`Échec de l'${actionText}.`);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        <div className="auth-switcher">
          <button
            type="button" 
            className={`auth-switcher-btn ${_switch ? 'active' : 'inactive'}`}
            onClick={() => set_switch(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-switcher-btn ${!_switch ? 'active' : 'inactive'}`}
            onClick={() => set_switch(false)}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form-body" onSubmit={handleSubmit}>
          
          {_switch ? (
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          ) : (
            <Register
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}

        </form>
      </div>
    </div>
  );
}

