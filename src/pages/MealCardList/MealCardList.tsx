// npm modules
import { useState, useEffect } from 'react'

// services
import * as mealCardService from '../../services/mealCardService'
import * as profileService from '../../services/profileService'

// css
import styles from './MealCardList.module.css'

// types
import { MealCard, User, LikedMeal, PassedMeal } from '../../types/models'

// components
import MealCardComp from '../../components/MealCardComp/MealCardComp'
import NewMealCard from '../../components/NewMealCard/NewMealCard'

interface MealCardListProps {
  user: User
}

const MealCardList = (props: MealCardListProps): JSX.Element => {
  const [mealCards, setMealCards] = useState<MealCard[]>([])
  const [displayedMealCards, setDisplayedMealCards] = useState<MealCard[]>([])
  const [likedMeals, setLikedMeals] = useState<LikedMeal[]>([])
  const [passedMeals, setPassedMeals] = useState<PassedMeal[]>([])

  const filterMealCards = () => {
    if (likedMeals.length === 0 && passedMeals.length === 0) {
      return mealCards
    }
  
    const filteredMealCards = mealCards.filter((mealCard: MealCard) => {
      const likedMealIds = likedMeals.map((likedMeal: LikedMeal) => likedMeal.mealCardId)
      const passedMealIds = passedMeals.map((passedMeal: PassedMeal) => passedMeal.mealCardId)
    
      const isLiked = likedMealIds.includes(mealCard.id)
      const isPassed = passedMealIds.includes(mealCard.id)
    
      return !isLiked && !isPassed
    })
    return filteredMealCards
  }

  const updateMealCards = () => {
    const filteredMealCards = filterMealCards()
    setDisplayedMealCards(filteredMealCards)
  }
  
  useEffect(() => {
    const fetchMealCards = async (): Promise<void> => {
      try {
        const likedMeals: LikedMeal[] = await profileService.getLikedMeals(props.user.id)
        setLikedMeals(likedMeals)
        updateMealCards()
      } catch (error) {
        console.log(error)
      }
    }
    fetchMealCards()
  }, [])

  useEffect(() => {
    const fetchMealCards = async (): Promise<void> => {
      try {
        const passedMeals: PassedMeal[] = await profileService.getPassedMeals(props.user.id)
        setPassedMeals(passedMeals)
        updateMealCards()
      } catch (error) {
        console.log(error)
      }
    }
    fetchMealCards()
  }, [])

  useEffect(() => {
    const fetchMealCards = async (): Promise<void> => {
      try {
        const mealCardData: MealCard[] = await mealCardService.getAllMealCards()
        setMealCards(mealCardData)
        setDisplayedMealCards(filterMealCards())
      } catch (error) {
        console.log(error)
      }
    }
    fetchMealCards()
  }, [])


  return (
    <main className={styles.MealCardList}>
      { !mealCards.length
        ?
        <h1>nothing to swipe on</h1>
        :
        <>
          <h1>Hello. This is a list of all the mealCards.</h1>
          <NewMealCard mealCards={mealCards} setMealCards={setMealCards}/>
          {filterMealCards().map((mealCard: MealCard) => (
            <MealCardComp 
              key={mealCard.id} 
              mealCard={mealCard} 
              user={props.user} 
              mealCards={mealCards}
              setMealCards={setMealCards}
              updateMealCards={updateMealCards}
              filterMealCards={filterMealCards}
            />
          ))}
        </>
      }
    </main>
  )
}

export default MealCardList