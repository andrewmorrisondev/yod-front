// css
import styles from './YukButton.module.css'

// services
import * as profileService from '../../services/profileService'

interface YukButtonProps {
  profielId: Number,
  mealCardId: Number,
  updateMealCards: () => void
}

const YukButton = (props: YukButtonProps): JSX.Element => {
  const handleClick = () => {
    profileService.associatePassedMeals(props.profielId, props.mealCardId)
    props.updateMealCards()
  }

  return (
    <div className={styles.yukButton} onClick={() => handleClick()}>
      <p>Yuk</p>
    </div>
  )
}

export default YukButton