import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import './navigation.css';
import Activity from '../Activity';

export default function SideBar() {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/activity', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        setActivities(response.data);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    if (['home', 'favorites', 'watchlater'].includes(currentPath)) {
      setSelected(currentPath);
    } else {
      setSelected('home');
    }
  }, [location.pathname]);

  const setPage = (pageName) => {
    setSelected(pageName);
    navigate(`/${pageName}`);
  };

  const navItems = [
    { name: 'home', label: 'Home', icon: faFolder },
    { name: 'favorites', label: 'Favorites', icon: faStar },
    { name: 'watchlater', label: 'Watch Later', icon: faClock },
  ];

  return (
    <nav 
      className={`sidebar-nav ${small ? 'small' : 'expanded'}`}
      onMouseEnter={() => setSmall(false)}
      onMouseLeave={() => setSmall(true)}
    >
      <ul className="nav-links">
        {navItems.map((item) => (
          <li 
            key={item.name}
            className={selected === item.name ? 'active' : ''}
            onClick={() => setPage(item.name)}
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            <span className="nav-text">{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="activities-container">
        <h2 className="activities-title">Latest Activities</h2>
        <div className="activities-separator"></div>
        <ul className="activities-list">
          {activities.slice(0, 10).map((activity) => (
            <Activity key={activity._id} activity={activity} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
