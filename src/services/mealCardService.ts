// services 
import * as tokenService from './tokenService'

// types
import { MealCard } from '../types/models'

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

export {
  getAllMealCards
}