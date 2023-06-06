// types
import { MealCard, User } from "../../types/models"
import YumButton from "../YumButton/YumButton"
import YukButton from "../YukButton/YukButton"

// css
import styles from './MealCardComp.module.css'

interface MealCardCompProps {
  key: Number,
  mealCard: MealCard,
  user: User
}

const MealCardComp = (props: MealCardCompProps): JSX.Element => {
  
  return (
    <div className={styles.mealCard}>
      <div className={styles.data}>
        <h1>{props.mealCard.name}</h1>
        <img src={props.mealCard.photo} alt={props.mealCard.name} />
      </div>
      <div className={styles.buttons}>
      <YumButton profielId={props.user.id} mealCardId={props.mealCard.id} />
      <YukButton profielId={props.user.id} mealCardId={props.mealCard.id} />
      </div>
    </div>
  )
}

export default MealCardComp