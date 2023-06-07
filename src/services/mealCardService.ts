// services 
import * as tokenService from './tokenService'

// types
import { MealCard} from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/mealCards`

async function getAllMealCards(): Promise<MealCard[]> {
    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
    return await res.json() as MealCard[]
}

async function createMealCard(mealCardData: FormData): Promise<MealCard> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(mealCardData)
  })
  return await res.json() as MealCard
}

async function addPhoto(photoData: FormData, mealCardId: Number): Promise<MealCard> {
  const res = await fetch(`${BASE_URL}/${mealCardId}/add-photo`, {
    method: 'PUT',
    body: photoData
  })
	return await res.json()
}

async function deleteMealCard(mealCardId: Number): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/${mealCardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

async function editMealCard(mealCardId: Number, mealCardData: FormData): Promise<MealCard | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/${mealCardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(mealCardData)
    })
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

export {
  getAllMealCards,
  createMealCard,
  addPhoto,
  deleteMealCard,
  editMealCard,
}