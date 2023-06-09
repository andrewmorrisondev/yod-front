// npm modules
import { useState, useEffect } from 'react'

// services
import * as mealCardService from '../../services/mealCardService'
import * as profileService from '../../services/profileService'

// css
import styles from './MealCardList.module.css'

// types
import { MealCard, User } from '../../types/models'

// components
import MealCardComp from '../../components/MealCardComp/MealCardComp'
import NewMealCard from '../../components/NewMealCard/NewMealCard'

interface MealCardListProps {
  user: User,
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const MealCardList = (props: MealCardListProps): JSX.Element => {

  const [filteredMealCards, setFilteredMealCards] = useState<MealCard[]>([])


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
  }, [props.yukYumToggle])

  useEffect(() => {
    const fetchMealCards = async (): Promise<void> => {
      try {
        const mealCardData: MealCard[] = await mealCardService.getAllMealCards()
        props.setMealCards(mealCardData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMealCards()
  }, [])


  return (
    <main className={styles.MealCardList}>
      <h1 className={styles.heading}>Yuk-or-Yum?</h1>
      { !props.mealCards.length
        ?
        <h1>nothing to swipe on</h1>
        :
        <>
          {console.log(filteredMealCards)}
          <div className={styles.mealCardList}>
            <NewMealCard 
              mealCards={props.mealCards} 
              setMealCards={props.setMealCards}
              yukYumToggle={props.yukYumToggle}
              setYukYumToggle={props.setYukYumToggle}
            />
            {filteredMealCards.map((mealCard: MealCard) => (
              <MealCardComp 
                key={mealCard.id} 
                mealCard={mealCard} 
                user={props.user} 
                mealCards={props.mealCards}
                setMealCards={props.setMealCards}
                yukYumToggle={props.yukYumToggle}
                setYukYumToggle={props.setYukYumToggle}
              />
            ))}
          </div>
          <div className={styles.navBarSpacer}></div>
        </>
      }
    </main>
  )
}

export default MealCardList