// types
import { MealCard, User } from "../../types/models"

// components
import DeleteButton from "../DeleteButton/DeleteButton"
import EditButton from "../EditButton/EditButton"

// css
import styles from './LikedMealCardComp.module.css'

interface LikedMealCardCompProps {
  key: Number,
  mealCard: MealCard,
  mealCards: MealCard[],
  user: User,
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const LikedMealCardComp = (props: LikedMealCardCompProps): JSX.Element => {
  
  return (
    <div className={styles.mealCard}>
      <div className={styles.data}>
        <h1>{props.mealCard.name}</h1>
        <img src={props.mealCard.photo} alt={props.mealCard.name} />
      </div>
      <div className={styles.buttons}>
      {props.user.profile.id.toString() === props.mealCard.creatorId.toString() &&
        <>
          <DeleteButton 
            mealCardId={props.mealCard.id} 
            mealCards={props.mealCards} 
            setMealCards={props.setMealCards}
            yukYumToggle={props.yukYumToggle}
            setYukYumToggle={props.setYukYumToggle} 
          />
          <EditButton mealCardId={props.mealCard.id} mealCard={props.mealCard} />
        </>
      }
      </div>
    </div>
  )
}

export default LikedMealCardComp