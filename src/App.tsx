import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import TryMeScreen from './components/TryMeScreen'
import ResultsScreen from './components/ResultsScreen'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoginState = localStorage.getItem('isLoggedIn')
    return storedLoginState ? JSON.parse(storedLoginState) : false
  })

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  const handleRegister = () => {
    // You might want to automatically log in the user after registration
    // or navigate them to the login page
    console.log('User registered')
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/try-me" /> : <WelcomeScreen />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/try-me" /> : <LoginScreen onLogin={handleLogin} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/try-me" /> : <RegisterScreen onRegister={handleRegister} />} />
        <Route path="/try-me" element={isLoggedIn ? <TryMeScreen onLogout={handleLogout} /> : <Navigate to="/login" />} />        
        <Route path="/results" element={isLoggedIn ? <ResultsScreen /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}