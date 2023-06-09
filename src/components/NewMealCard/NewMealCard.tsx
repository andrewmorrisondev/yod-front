// npm modules
import { useState } from 'react'
// css
import styles from './NewMealCard.module.css'
// services
import * as mealCardService from '../../services/mealCardService'
// types
import { MealCard } from '../../types/models'

interface NewMealCardProps {
  mealCards: MealCard[],
  setMealCards: React.Dispatch<React.SetStateAction<MealCard[]>>
  yukYumToggle: boolean,
  setYukYumToggle: React.Dispatch<React.SetStateAction<boolean>>
}

type PhotoData = {
  photo: File
}

const NewMealCard = (props: NewMealCardProps): JSX.Element => {
  const [photoData, setPhotoData] = useState<PhotoData | undefined>(undefined)
  const [formData, setFormData] = useState<FormData>(new FormData())
  const { mealCards, setMealCards } = props

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      setPhotoData({ photo: evt.target.files[0]})
    }
  }

  const handleChangeForm = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const mealPhotoHelper = async (photo: File, mealCardId: number): Promise<any> => {
    const photoData = new FormData()
    photoData.append('photo', photo)
    return await mealCardService.addPhoto(photoData, mealCardId)
  }

  const handleAddMeal = async (formData: FormData, photo?: File) => {
    const newMeal = await mealCardService.createMealCard(formData)
    console.log(newMeal)
    if (photo) {
      newMeal.photo = await mealPhotoHelper(photo, newMeal.id)
    }
    setMealCards([...mealCards, newMeal])
  }
  
  
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (photoData && photoData.photo) {
      handleAddMeal(formData, photoData.photo)
    } else {
      handleAddMeal(formData, undefined)
    }
    setFormData(new FormData())
    const inputElements = Array.from(document.querySelectorAll('input'));
    inputElements.forEach((input) => {
      input.value = '';
    });
    props.setYukYumToggle(!props.yukYumToggle)
  }
  
  return (
    <form onSubmit={handleSubmit} className={styles.newMealCardForm}>
      <label htmlFor="name">Name</label>
        <input 
          type="text"
          name="name"
          id="name"
          placeholder='Beef Wellington'
          onChange={handleChangeForm}
        />
      
      
      <label htmlFor="about">About</label>
        <input 
          type="text"
          name="about"
          id="about"
          placeholder="As seen on TV"
          onChange={handleChangeForm}
        />
      
      <label htmlFor="resturantName">Resturant Name</label>
        <input
          type="text"
          name="resturantName"
          id="resturantName"
          placeholder="Hell's Kitchen"
          onChange={handleChangeForm}
        />
      
      <label htmlFor="resturantAddress">Resturant Address</label>
        <input
          type="text"
          name="resturantAddress"
          id="resturantAddress"
          onChange={handleChangeForm}
          placeholder='www.gordonramsayrestaurants.com'
        />
      
      <label htmlFor="photo-upload">Photo</label>
        <input 
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewMealCard
