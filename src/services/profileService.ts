// services
import * as tokenService from './tokenService'

// types
import { PhotoFormData } from '../types/forms'
import { LikedMeal, PassedMeal, Profile, MealCard } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles(): Promise<Profile[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Profile[]
}

async function getProfileById(profileId: Number): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/${profileId}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Profile
}

async function associateLikedMeals(profileId: Number, mealId: Number): Promise<LikedMeal> {
  const res = await fetch(`${BASE_URL}/${profileId}/likedMeals/${mealId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as LikedMeal
}

async function associatePassedMeals(profileId: Number, mealId: Number): Promise<PassedMeal> {
  const res = await fetch(`${BASE_URL}/${profileId}/passedMeals/${mealId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as PassedMeal
}

async function getLikedMeals(profileId: Number): Promise<LikedMeal[]> {
  const res = await fetch(`${BASE_URL}/${profileId}/likedMeals`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as LikedMeal[]
}

async function getPassedMeals(profileId: Number): Promise<PassedMeal[]> {
  const res = await fetch(`${BASE_URL}/${profileId}/passedMeals`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as PassedMeal[]
}

async function getFilteredMealCards(profileId: Number): Promise<MealCard[] | undefined > {
  const res = await fetch(`${BASE_URL}/${profileId}/filteredMealCards`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as MealCard[]
}

async function addPhoto(photoData: PhotoFormData): Promise<string> {
  if (!photoData.photo) throw new Error("No photo found.")
  
  const photoFormData = new FormData()
  photoFormData.append('photo', photoData.photo)

  const user = tokenService.getUserFromToken()
  if (!user) throw new Error("No user.")
  
  const profileId = user.profile.id
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoFormData
  })
  return await res.json() as string
}

export { 
  getAllProfiles, 
  getProfileById, 
  associateLikedMeals,
  associatePassedMeals,
  getLikedMeals,
  getPassedMeals,
  getFilteredMealCards,
  addPhoto
}
