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
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
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
        yukYumToggle={props.yukYumToggle}
        setYukYumToggle={props.setYukYumToggle} 

      />
      <YukButton 
        profielId={props.user.id} 
        mealCardId={props.mealCard.id} 
        yukYumToggle={props.yukYumToggle}
        setYukYumToggle={props.setYukYumToggle}

      />
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

export default MealCardComp