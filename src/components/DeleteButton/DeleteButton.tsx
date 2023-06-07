// css
import styles from './DeleteButton.module.css'

// services
import * as mealCardService from '../../services/mealCardService'

// types
import { MealCard } from '../../types/models'

interface DeleteButtonProps {
  mealCardId: Number,
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>
}

const DeleteButton = (props: DeleteButtonProps): JSX.Element => {
  
  const handleClick = async () => {
    await mealCardService.deleteMealCard(props.mealCardId)
    const updatedMealCards = props.mealCards.filter(
      (mealCard) => mealCard.id !== props.mealCardId
    )
    props.setMealCards(updatedMealCards);
  }

  return (
    <div className={styles.deleteButton} onClick={() => handleClick()}>
      <p>X</p>
    </div>
  )
}

export default DeleteButton