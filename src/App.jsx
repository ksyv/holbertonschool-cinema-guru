import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 1. Importer les composants (qui sont maintenant nos placeholders)
import Authentication from './routes/Authentication';
import Dashboard from './routes/Dashboard';

// On définit la base de l'URL de l'API ici (backend Docker)
const API_BASE_URL = 'http://localhost:8000';

function App() {
  
  // 2. Ajout des états demandés
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  // 3. Hook useEffect pour la vérification au montage
  useEffect(() => {
    // On définit une fonction async à l'intérieur pour
    // pouvoir utiliser "await" pour l'appel API
    const checkUserToken = async () => {
      
      // 4. Récupérer le token depuis le localStorage
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        // Si pas de token, on ne fait rien.
        // L'utilisateur reste déconnecté (isLoggedIn est false par défaut)
        return; 
      }

      try {
        // 5. Envoyer la requête POST de vérification au backend
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/`, // URL complète
          null, // Pas de corps de données (body) à envoyer
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        // 6. En cas de succès (le token est valide)
        if (response.data && response.data.username) {
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        }

      } catch (error) {
        // 7. En cas d'erreur (token expiré, invalide...)
        console.error('Erreur d\'authentification:', error.response ? error.response.data : error.message);
        // On s'assure que l'utilisateur est déconnecté
        setIsLoggedIn(false);
        setUserUsername("");
        // C'est une bonne pratique de supprimer un token invalide
        localStorage.removeItem('accessToken');
      }
    };

    // On appelle la fonction de vérification
    checkUserToken();
    
  }, []); // Le tableau vide [] signifie: "exécute ce code une seule fois, au montage"

  // 8. Rendu conditionnel : on affiche un composant ou l'autre
  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard username={userUsername} />
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default App;