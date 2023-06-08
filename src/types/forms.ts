/* ---------==== custom forms ====--------- */



/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}

export interface MealCardFormData {
  name: string;
  about: string;
  photo: File | null;
  resturantName: string;
  resturantAddress: string;
}