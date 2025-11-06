  import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

export default function Button({
  label,
  className,
  onClick,
  icon
}) {
  return (
   
    <button
      className={`btn ${className || ''}`}
      onClick={onClick} 
    >
      
      {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
      <span>{label}</span>
      
    </button>
  );
}