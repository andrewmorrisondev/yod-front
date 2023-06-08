// css
import styles from './YumButton.module.css'

// services
import * as profileService from '../../services/profileService'

interface YumButtonProps {
  profielId: Number,
  mealCardId: Number,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const YumButton = (props: YumButtonProps): JSX.Element => {
  const handleClick = async () => {
    await profileService.associateLikedMeals(props.profielId, props.mealCardId)
    props.setYukYumToggle(!props.yukYumToggle)
  }

  return (
    <div className={styles.yumButton} onClick={handleClick}>
      <p>Yum</p>
    </div>
  )
}

export default YumButton