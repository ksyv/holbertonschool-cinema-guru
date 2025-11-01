import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'

import Authentication from './routes/auth/Authentication'
import Dashboard from './routes/dashboard/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userUsername, setUserUsername] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserToken = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/auth/', 
            null, 
            {
              headers: { 'Authorization': `Bearer ${accessToken}` }
            }
          )
          setUserUsername(response.data.username)
          setIsLoggedIn(true)
        } catch (error) {
          console.error("Token verification failed", error)
          setIsLoggedIn(false)
          localStorage.removeItem('accessToken')
        }
      } else {
        setIsLoggedIn(false)
      }
    }
    checkUserToken()
  }, [isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    } else {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route 
          path="/" 
          element={
            <Authentication 
              setIsLoggedIn={setIsLoggedIn} 
              setUserUsername={setUserUsername} 
            />
          } 
        />
      ) : (
        <Route 
          path="/*" 
          element={
            <Dashboard 
              userUsername={userUsername} 
              setIsLoggedIn={setIsLoggedIn} 
            />
          } 
        />
      )}
    </Routes>
  )
}

export default App