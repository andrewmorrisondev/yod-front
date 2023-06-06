// npm modules
import { useState, useEffect } from 'react'

// css
import styles from './ProfileDetails.module.css'

// services
import * as profileService from '../../services/profileService'

// types
import { Profile, User } from '../../types/models'

interface ProfileDetailsProps {
  user: User
}

const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => {
  const { user } = props
  const [profile, setProfile] = useState<Profile>({} as Profile)

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const profileData: Profile = await profileService.getProfileById(user.id)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <>
      <main className={styles.container}>
          <div className={styles.profileContainer}>
            <h1>{profile.name}</h1>
          </div>
      </main>
    </>
  )
}

export default ProfileDetails