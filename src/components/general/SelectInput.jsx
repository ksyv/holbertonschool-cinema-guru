import React from 'react';
import './general.css';

export default function SelectInput({
  label,
  options,
  className,
  value,
  setValue
}) {

  // Fonction similaire à handleInput, mais pour le <select>
  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  return (
    // On réutilise "input-wrapper" pour un style cohérent
    <div className={`input-wrapper ${className || ''}`}>
      <label>{label}</label>
      
      <select value={value} onChange={handleSelect}>
        
        {/* On "map" (boucle) sur le tableau "options" 
            pour générer chaque balise <option> */}
        {options.map((option) => (
          
          // "key" est obligatoire pour React lors d'un .map()
          // Il permet à React d'identifier chaque élément de manière unique.
          // On suppose ici que "option" est un objet ex: { value: 'us', label: 'USA' }
          <option key={option.value} value={option.value}>
            {option.label}
          </option>

        ))}
      </select>
    </div>
  );
}