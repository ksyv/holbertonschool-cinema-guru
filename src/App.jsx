import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dashboard';

const API_URL = 'http://localhost:8000/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkUserToken = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const response = await axios.post(
            `${API_URL}/auth/`, 
            null,
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
          );
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        } catch (error) {
          console.error("Token validation failed", error);
          localStorage.removeItem('accessToken');
          setIsLoggedIn(false);
        }
      }
      setIsAuthReady(true);
    };
    checkUserToken();
  }, []);

  if (!isAuthReady) {
    return null;
  }

  return (
    <Routes>
      {isLoggedIn ? (
        <Route 
          path="/*" 
          element={
            <Dashboard 
              userUsername={userUsername} 
              setIsLoggedIn={setIsLoggedIn} 
            />
          } 
        />
      ) : (
        <Route 
          path="/*" 
          element={
            <Authentication 
              setIsLoggedIn={setIsLoggedIn} 
              setUserUsername={setUserUsername} 
            />
          } 
        />
      )}
    </Routes>
  );
}

export default App;
