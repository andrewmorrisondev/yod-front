// css
import styles from './YumButton.module.css'

// services
import * as profileService from '../../services/profileService'

interface YumButtonProps {
  profielId: Number,
  mealCardId: Number
}

const YumButton = (props: YumButtonProps): JSX.Element => {
  
  const handleClick = () => {
    profileService.associateLikedMeals(props.profielId, props.mealCardId)
    console.log('yum')
  }

  return (
    <div className={styles.yumButton} onClick={() => handleClick()}>
      <p>Yum</p>
    </div>
  )
}

export default YumButton