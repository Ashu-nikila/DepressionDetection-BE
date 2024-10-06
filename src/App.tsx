import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import TryMeScreen from './components/TryMeScreen'
import ResultsScreen from './components/ResultsScreen'

const isLoginValid = () => {
  const loginTimestamp = localStorage.getItem('loginTimestamp')
  if (loginTimestamp) {
    const currentTime = new Date().getTime()
    const loginTime = parseInt(loginTimestamp, 10)
    // Check if the login was within the last 24 hours (86400000 milliseconds)
    return currentTime - loginTime < 86400000
  }
  return false
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoginValid)

  useEffect(() => {
    const checkLoginStatus = () => {
      if (isLoginValid()) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('loginTimestamp')
      }
    }

    checkLoginStatus()
    // Check login status every minute
    const intervalId = setInterval(checkLoginStatus, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('loginTimestamp', new Date().getTime().toString())
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('loginTimestamp')
    setIsLoggedIn(false)
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