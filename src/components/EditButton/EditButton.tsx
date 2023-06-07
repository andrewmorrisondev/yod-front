// npm modules
import { Link } from 'react-router-dom'
// css
import styles from './EditButton.module.css'

// types
import { MealCard } from '../../types/models'

interface EditButtonProps {
  mealCardId: number,
  mealCard: MealCard,
}

const EditButton = (props: EditButtonProps): JSX.Element => {

  return (
    <Link to={`${props.mealCardId}/edit`} state={props.mealCard}>
      <div className={styles.editButton}>
        <p>Edit</p>
      </div>
    </Link>
  )
}

export default EditButton