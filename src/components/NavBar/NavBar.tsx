// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './NavBar.module.css'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav className={styles.navBar}>
      {user ?
        <>
          <NavLink to={`/profiles/${user.id}`}>
            <i className="fa-solid fa-user fa-2xl"></i>
          </NavLink>
          
          <NavLink to="/mealCards">
            <i className="fa-solid fa-burger fa-2xl"></i>
          </NavLink>
          
          <NavLink to="" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></NavLink>
        </>
        :      
        <>
          <NavLink to="/auth/login">Log In</NavLink>
          <NavLink to="/auth/signup">Sign Up</NavLink>
        </>
      }
    </nav>
  )
}

export default NavBar
