// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// css
import styles from './ProfileDetails.module.css'

// services
import * as profileService from '../../services/profileService'
import * as mealCardService from '../../services/mealCardService'

// components
import LikedMealCardComp from '../../components/LikedMealCardComp/LikedMealCardComp'

// types
import { Profile, User, MealCard, LikedMeal } from '../../types/models'

interface ProfileDetailsProps {
  user: User,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>,
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>
}

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const [profile, setProfile] = useState<Profile>({} as Profile)
  const [likedMeals, setLikedMeals] = useState<MealCard[]>([])

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfileById(user.id)
        setProfile(profileData)
        console.log(profile)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    const fetchFiltredMealCards = async (): Promise<void> => {
      try {
        const mealCards: MealCard[] | undefined = await mealCardService.getAllMealCards()
        const likedMeals: LikedMeal[] | undefined = await profileService.getLikedMeals(user.id)
        const likedMealIds: number[] = likedMeals?.map((likedMeal: LikedMeal) => likedMeal.mealCardId) || []
        const filteredMealCards: MealCard[] = mealCards?.filter((mealCard: MealCard) => likedMealIds.includes(mealCard.id)) || []
        setLikedMeals(filteredMealCards)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFiltredMealCards()
  }, [props.yukYumToggle])

  return (
    <>
      <main className={styles.container}>
        <h1>Hi there {user.name}!</h1>
        <Link to="/auth/change-password">Change Password</Link>
        {likedMeals.map((mealCard: MealCard) => (
            <LikedMealCardComp 
              key={mealCard.id} 
              mealCard={mealCard} 
              mealCards={props.mealCards}
              user={props.user} 
              setMealCards={props.setMealCards}
              yukYumToggle={props.yukYumToggle}
              setYukYumToggle={props.setYukYumToggle}
            />
          ))}
      </main>
    </>
  )
}

export default ProfileDetails