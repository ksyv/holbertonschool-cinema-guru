import React, { useState } from 'react';
import './auth.css'; // On importe le NOUVEAU auth.css

import Login from './Login';
import Register from './Register';

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  
  // _switch = true  -> Vue Login (active)
  // _switch = false -> Vue Register (active)
  const [ _switch, set_switch ] = useState(true); 
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  // La logique de soumission (sera gérée à la Tâche 5)
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (_switch) {
      console.log('Tentative de connexion (LOGIN)');
    } else {
      console.log('Tentative d\'inscription (REGISTER)');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* 1. Le "Switcher" (les 2 blocs rouges) */}
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

        {/* 2. Le corps du formulaire (blanc) */}
        {/* On passe la fonction handleSubmit au <form> */}
        <form className="auth-form-body" onSubmit={handleSubmit}>
          
          {/* On affiche Login ou Register selon l'état _switch */}
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

