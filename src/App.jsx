import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Authentication from './routes/auth/Authentication'; 
import Dashboard from './routes/dashboard/Dashboard'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const checkUserToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        const BASE_URL = 'http://localhost:8000';
        try {
          const response = await axios.post(
            `${BASE_URL}/api/auth/`, 
            null,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`
              }
            }
          );
          
          setUserUsername(response.data.username);
          setIsLoggedIn(true);

        } catch (error) {
          console.error("Session invalide:", error);
          localStorage.removeItem('accessToken'); 
          setIsLoggedIn(false);
        }
      }
    };

    checkUserToken();
  }, []); 

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} />
      ) : (
        <Authentication 
          setIsLoggedIn={setIsLoggedIn} 
          setUserUsername={setUserUsername} 
        />
      )}
    </div>
  );
}

export default App;
