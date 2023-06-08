// npm modules
import { useState, useEffect } from 'react'

// services
import * as mealCardService from '../../services/mealCardService'
import * as profileService from '../../services/profileService'

// css
import styles from './MealCardList.module.css'

// types
import { MealCard, User, 
  // LikedMeal, PassedMeal 
} from '../../types/models'

// components
import MealCardComp from '../../components/MealCardComp/MealCardComp'
import NewMealCard from '../../components/NewMealCard/NewMealCard'

interface MealCardListProps {
  user: User
}

const MealCardList = (props: MealCardListProps): JSX.Element => {
  const [mealCards, setMealCards] = useState<MealCard[]>([])
  const [filteredMealCards, setFilteredMealCards] = useState<MealCard[]>([])
  const [yukYumToggle, setYukYumToggle] = useState<boolean>(false)
  // const [likedMeals, setLikedMeals] = useState<LikedMeal[]>([])
  // const [passedMeals, setPassedMeals] = useState<PassedMeal[]>([])

  useEffect(() => {
    const fetchFiltredMealCards = async (): Promise<void> => {
      try {
        const filteredMealCards: MealCard[] | undefined = await profileService.getFilteredMealCards(props.user.id)
        filteredMealCards && setFilteredMealCards(filteredMealCards)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFiltredMealCards()
  }, [yukYumToggle])

  useEffect(() => {
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


  return (
    <main className={styles.MealCardList}>

      { !mealCards.length
        ?
        <h1>nothing to swipe on</h1>
        :
        <>
          <h1>Hello. This is a list of all the mealCards.</h1>
          <NewMealCard 
            mealCards={mealCards} 
            setMealCards={setMealCards}
            yukYumToggle={yukYumToggle}
            setYukYumToggle={setYukYumToggle}
          />
          {console.log(filteredMealCards)}
          {filteredMealCards.map((mealCard: MealCard) => (
            <MealCardComp 
              key={mealCard.id} 
              mealCard={mealCard} 
              user={props.user} 
              mealCards={mealCards}
              setMealCards={setMealCards}
              yukYumToggle={yukYumToggle}
              setYukYumToggle={setYukYumToggle}
            />
          ))}
        </>
      }
    </main>
  )
}

export default MealCardList