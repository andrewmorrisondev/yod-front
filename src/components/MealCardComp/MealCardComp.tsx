// types
import { MealCard, User } from "../../types/models"

// components
import YumButton from "../YumButton/YumButton"
import YukButton from "../YukButton/YukButton"
import DeleteButton from "../DeleteButton/DeleteButton"
import EditButton from "../EditButton/EditButton"

// css
import styles from './MealCardComp.module.css'

interface MealCardCompProps {
  key: Number,
  mealCard: MealCard,
  user: User,
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>,
  updateMealCards: () => void,
}

const MealCardComp = (props: MealCardCompProps): JSX.Element => {
  
  return (
    <div className={styles.mealCard}>
      <div className={styles.data}>
        <h1>{props.mealCard.name}</h1>
        <img src={props.mealCard.photo} alt={props.mealCard.name} />
      </div>
      <div className={styles.buttons}>
      <YumButton 
        profielId={props.user.id} 
        mealCardId={props.mealCard.id} 
        updateMealCards={props.updateMealCards}
      />
      <YukButton 
        profielId={props.user.id} 
        mealCardId={props.mealCard.id} 
        updateMealCards={props.updateMealCards}
      />
      {props.user.profile.id.toString() === props.mealCard.creatorId.toString() &&
        <>
          <DeleteButton mealCardId={props.mealCard.id} mealCards={props.mealCards} setMealCards={props.setMealCards} />
          <EditButton mealCardId={props.mealCard.id} mealCard={props.mealCard} />
        </>
      }
      </div>
    </div>
  )
}

export default MealCardComp