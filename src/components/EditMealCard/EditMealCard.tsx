// npm modules
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// css
import styles from './EditMealCard.module.css'
// services
import * as mealCardService from '../../services/mealCardService'
// types
import { MealCard } from '../../types/models'

type PhotoData = {
  photo: File
}

const EditMealCard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [photoData, setPhotoData] = useState<PhotoData | undefined>(undefined)
  const [formData, setFormData] = useState(location.state)
  const mealCard = location.state as MealCard


  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      setPhotoData({ photo: evt.target.files[0]})
    }
  }

  const handleAddMealCard = async (formData: FormData) => {
    if (photoData) {
      formData.append('photo', photoData.photo);
    }
    await mealCardService.editMealCard(mealCard.id, formData)
    navigate(`/mealCards`)
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    handleAddMealCard(formData)
  }  


  return (
    <form onSubmit={handleSubmit} className={styles.editMealCardForm}>
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="photo-upload">
        Photo
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </label>
      <label htmlFor="about">
        About
        <input
          type="text"
          name="about"
          id="about"
          value={formData.about}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="resturantName">
        Restaurant Name
        <input
          type="text"
          name="resturantName"
          id="resturantName"
          value={formData.resturantName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="resturantAddress">
        Restaurant Address
        <input
          type="text"
          name="resturantAddress"
          id="resturantAddress"
          value={formData.resturantAddress}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default EditMealCard

