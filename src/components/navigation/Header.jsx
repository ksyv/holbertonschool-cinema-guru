import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';

export default function Header({ userUsername, setIsLoggedIn }) {

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="header-nav">
      <a href="/" className="header-logo">
        Cinema Guru
      </a>

      <div className="header-user-info">
        <div className="user-avatar">
          <img 
            src={`https://picsum.photos/id/${userUsername.length + 10}/100/100`} 
            alt="User Avatar" 
          />
        </div>
        <div className="user-welcome">
          <p>Welcome, <span>{userUsername}</span>!</p>
        </div>
        <span className="logout-btn" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </span>
      </div>
    </nav>
  );
}

