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

export {
  getAllMealCards,
  createMealCard,
  addPhoto
}