// npm modules
import { useState, useEffect } from 'react'

// services
import * as mealCardService from '../../services/mealCardService'

// css
import styles from './MealCardList.module.css'

// types
import { MealCard, User } from '../../types/models'

// components
import MealCardComp from '../../components/MealCardComp/MealCardComp' 

interface MealCardListProps {
  user: User
}

const MealCardList = (props: MealCardListProps): JSX.Element => {
  const [mealCards, setMealCards] = useState<MealCard[]>([])

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

  if (!mealCards.length) return <main className={styles.MealCardList}><h1>nothing to swipe on</h1></main>

  return (
    <main className={styles.MealCardList}>
      <h1>Hello. This is a list of all the mealCards.</h1>
      {mealCards.map((mealCard: MealCard) => (
        <MealCardComp key={mealCard.id} mealCard={mealCard} user={props.user} />
      ))}
    </main>
  )
}

export default MealCardList