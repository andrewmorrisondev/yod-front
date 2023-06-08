// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import Landing from './pages/Landing/Landing'
import MealCardList from './pages/MealCardList/MealCardList'
import EditMealCard from './components/EditMealCard/EditMealCard'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'


// styles
import './App.css'

// types
import {
  User,
  MealCard
} from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const navigate = useNavigate()
  const [yukYumToggle, setYukYumToggle] = useState<boolean>(false)
  const [mealCards, setMealCards] = useState<MealCard[]>([])

  
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
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
                 {user !== null && 
                  <ProfileDetails
                    user={user}
                    yukYumToggle={yukYumToggle}
                    setYukYumToggle={setYukYumToggle}
                    mealCards={mealCards}
                    setMealCards={setMealCards}
                  />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/mealCards"
          element={
            <ProtectedRoute user={user}>
              {user !== null && 
              <MealCardList
                user={user}
                mealCards={mealCards}
                setMealCards={setMealCards}
                yukYumToggle={yukYumToggle}
                setYukYumToggle={setYukYumToggle}
              />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/mealCards/:id/edit"
          element={
            <ProtectedRoute user={user}>
              {user !== null && <EditMealCard/>}
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
