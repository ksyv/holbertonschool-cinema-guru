import React from 'react';
import './dashboard.css';
import Header from '../../components/navigation/Header';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard-container">
      <Header 
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

