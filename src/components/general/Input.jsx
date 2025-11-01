import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

// On déstructure les props directement dans la signature de la fonction
// C'est plus propre que d'écrire "props.label", "props.type", etc.
export default function Input({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes
}) {

  // 2. On crée la fonction handleInput
  // Elle reçoit l'objet "event" du DOM
  const handleInput = (event) => {
    // 3. On utilise la fonction setValue (passée en prop)
    // pour mettre à jour l'état du composant parent
    setValue(event.target.value);
  };

  // 1. On retourne le JSX
  // On utilise une classe de base "input-wrapper" pour le style
  // On y ajoute la "className" personnalisée si elle est fournie
  return (
    <div className={`input-wrapper ${className || ''}`}>
      
      {/* On affiche le label */}
      <label>{label}</label>
      
      {/* Rendu conditionnel : 
          On affiche l'icône SEULEMENT si la prop "icon" est fournie */}
      {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
      
      {/* L'élément <input> principal */}
      <input
        type={type} // ex: "text", "password", "email"
        value={value} // La valeur actuelle (contrôlée par l'état parent)
        onChange={handleInput} // La fonction qui se déclenche à chaque frappe
        
        // L'opérateur "spread" (...) est très puissant.
        // Il déverse ici toutes les propriétés de l'objet "inputAttributes"
        // ex: placeholder, required, minLength, etc.
        {...inputAttributes} 
      />
    </div>
  );
}