// css
import styles from './MealCardList.module.css'

// types
import { MealCard } from '../../types/models'

interface MealCardListProps {
  mealCards: MealCard[]
}

const MealCardList = ({ mealCards }: MealCardListProps): JSX.Element => {
  if (!mealCards.length) return <main className={styles.MealCardList}><h1>nothing to swipe on</h1></main>

  return (
    <main className={styles.MealCardList}>
      <h1>Hello. This is a list of all the mealCards.</h1>
      {mealCards.map((mealCard: MealCard) => (
        <p key={mealCard.id}>{mealCard.name}</p>
      ))}
    </main>
  )
}

export default MealCardList