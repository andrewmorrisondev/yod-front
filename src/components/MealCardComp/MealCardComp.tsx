// types
import { MealCard, User } from "../../types/models"

// components
import YumButton from "../YumButton/YumButton"
import YukButton from "../YukButton/YukButton"

// css
import styles from './MealCardComp.module.css'

interface MealCardCompProps {
  key: Number,
  mealCard: MealCard,
  user: User,
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const MealCardComp = (props: MealCardCompProps): JSX.Element => {
  
  return (
    <>
      <div className={styles.mealCard}>
        <img src={props.mealCard.photo} alt={props.mealCard.name} className={styles.foodImg} />
        <h1>{props.mealCard.name}</h1>
        <div className={styles.buttons}>
          <YumButton 
            profielId={props.user.id} 
            mealCardId={props.mealCard.id}
            yukYumToggle={props.yukYumToggle}
            setYukYumToggle={props.setYukYumToggle} 
            
            />
          <YukButton 
            profielId={props.user.id} 
            mealCardId={props.mealCard.id} 
            yukYumToggle={props.yukYumToggle}
            setYukYumToggle={props.setYukYumToggle}
            />
        </div>
      </div>
    </>
  )
}

export default MealCardComp