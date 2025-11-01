import React from 'react';
import './components.css';

export default function Activity({ activity }) {
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <li className="activity-item">
      <p>
        <span className="username">{activity.username}</span>
        {` ${activity.action} `}
        <span className="movie-title">{activity.movieTitle}</span>
        {` to ${activity.list}`}
      </p>
      <span className="date">{`- ${formatDate(activity.timestamp)}`}</span>
    </li>
  );
}
