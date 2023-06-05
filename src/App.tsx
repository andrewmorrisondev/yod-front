// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as mealCardService from './services/MealCardService'

// styles
import './App.css'

// types
import { User } from './types/models'
import { MealCard } from './types/models'
import MealCardList from './pages/MealCardList/MealCardList'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [mealCards, setMealCards] = useState<MealCard[]>([])
  const navigate = useNavigate()

  useEffect((): void => {
    const fetchMealCards = async (): Promise<void> => {
      try {
        const mealCardData: MealCard[] = await mealCardService.getAllMealCards()
        setMealCards(mealCardData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMealCards()
  }, [])
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mealCards"
          element={
            <ProtectedRoute user={user}>
              <MealCardList mealCards={mealCards} />
            </ProtectedRoute>
          }
        />        
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
