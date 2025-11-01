import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './dashboard.css';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';

import Home from '../Home';
import Favorites from '../Favorites';
import WatchLater from '../WatchLater';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  const [isSidebarSmall, setIsSidebarSmall] = useState(true);

  return (
    <div className={`dashboard-layout ${!isSidebarSmall ? 'sidebar-expanded' : ''}`}>
      <Header 
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="dashboard-body">
        <SideBar 
          setSmall={setIsSidebarSmall}
        />
        <main className="dashboard-content">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="watchlater" element={<WatchLater />} />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
