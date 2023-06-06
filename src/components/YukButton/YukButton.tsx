// css
import styles from './YukButton.module.css'

// services
import * as profileService from '../../services/profileService'

interface YukButtonProps {
  profielId: Number,
  mealCardId: Number
}

const YukButton = (props: YukButtonProps): JSX.Element => {
  
  const handleClick = () => {
    profileService.associateLikedMeals(props.profielId, props.mealCardId)
    console.log('yuk')
  }

  return (
    <div className={styles.yukButton} onClick={() => handleClick()}>
      <p>Yuk</p>
    </div>
  )
}

export default YukButton