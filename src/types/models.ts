/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  userId: { id: number };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

/* ---------===== models =====--------- */

export interface MealCard {
  id: number;
  name: string;
  photo: string;
  about: string;
  creatorId: { id: number };
  resturantName?: string;
  resturantAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LikedMeal {
  id: number;
  swiperId: { id: number };
  mealCardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PassedMeal {
  id: number;
  swiperId: { id: number };
  mealCardId: number;
  createdAt: string;
  updatedAt: string;
}