import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './dashboard.css';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';

// CORRECTION: Les pages sont dans le même dossier
import HomePage from '../HomePage';
import FavoritesPage from '../FavoritesPage';
import WatchLaterPage from '../WatchLaterPage';

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  // Suppression de l'état [isSidebarSmall] - géré par CSS
  return (
    <div className="dashboard-layout">
      <Header 
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="dashboard-body">
        {/* Suppression de la prop 'setSmall' */}
        <SideBar /> 
        <main className="dashboard-content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/watchlater" element={<WatchLaterPage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}