// css
import styles from './YukButton.module.css'

// services
import * as profileService from '../../services/profileService'

interface YukButtonProps {
  profielId: Number,
  mealCardId: Number,
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const YukButton = (props: YukButtonProps): JSX.Element => {
  const handleClick = async () => {
    await profileService.associatePassedMeals(props.profielId, props.mealCardId)
    props.setYukYumToggle(!props.yukYumToggle)
  }

  return (
    <div className={styles.yukButton} onClick={handleClick}>
      <p>Yuk</p>
    </div>
  )
}

export default YukButton