import React from 'react';

// Ceci est un composant "espace réservé"
// Il sera développé dans une tâche future.
// On accepte "username" en prop, car App.jsx va le passer.
export default function Dashboard({ username }) {
  return (
    <div style={{ 
      padding: '50px', 
      backgroundColor: '#141414', 
      color: 'white', 
      minHeight: '100vh' 
    }}>
      <h1>Bienvenue, {username || 'Utilisateur'}!</h1>
      <p>Ceci est votre Tableau de Bord "Cinema Guru".</p>
      {/* Plus tard, on affichera les listes de films ici */}
    </div>
  );
}
