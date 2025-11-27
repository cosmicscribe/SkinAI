import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import DiseasesDictionary from './pages/DiseasesDictionary'
import DiseaseDetail from './pages/DiseaseDetail'
import FAQ from './pages/FAQ'
import LoginRegister from './pages/LoginRegister'
import QuizPage from './pages/QuizPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.clear()
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LandingPage isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />}
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/diseases"
          element={<DiseasesDictionary isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />}
        />
        <Route
          path="/diseases/:diseaseName"
          element={<DiseaseDetail isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />}
        />
        <Route
          path="/faq"
          element={<FAQ isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />}
        />
        <Route
          path="/quiz"
          element={<QuizPage />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginRegister onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginRegister onLogin={handleLogin} />
            )
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />} />
        <Route path="/terms-of-service" element={<TermsOfService isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  )
}

export default App

