import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFolder, 
  faStar, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';
import './navigation.css';
import Activity from '../Activity';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return { headers: { 'Authorization': `Bearer ${accessToken}` } };
};

// CORRECTION: Prop 'setSmall' supprimée
export default function SideBar() {
  const [selected, setSelected] = useState("home");
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  
  const navigate = useNavigate();

  const navItems = [
    { name: "home", label: "Home", icon: faFolder, path: "/home" },
    { name: "favorites", label: "Favorites", icon: faStar, path: "/favorites" },
    { name: "watchlater", label: "Watch Later", icon: faClock, path: "/watchlater" },
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_URL}/activity`, getAuthHeaders());
        setActivities(Array.isArray(response.data.activities) ? response.data.activities : []);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };
    fetchActivities();
  }, []);
  
  const setPage = (pageName, path) => {
    setSelected(pageName);
    navigate(path);
  };

  // CORRECTION: 'handleToggle' n'est plus nécessaire
  const handleShowActivities = () => {
    setShowActivities(!showActivities);
  };

  return (
    // CORRECTION: Plus de classe dynamique 'small'/'large', géré par :hover
    <nav className="sidebar">
      {/* CORRECTION: Bouton 'sidebar-toggle' supprimé */}
      
      <ul className="sidebar-nav-list">
        {navItems.map((item) => (
          <li 
            key={item.name}
            className={`sidebar-nav-item ${selected === item.name ? 'active' : ''}`}
            onClick={() => setPage(item.name, item.path)}
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </li>
        ))}
      </ul>
      
      <div className="sidebar-activities">
        <h3 className="activities-title" onClick={handleShowActivities}>
          Latest Activities
        </h3>
        <ul className={`activities-list ${showActivities ? 'visible' : ''}`}>
          {Array.isArray(activities) && activities.slice(0, 10).map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </ul>
      </div>
    </nav>
  );
}