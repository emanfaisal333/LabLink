export const BASE_URL = "https://lablink-trial-default-rtdb.firebaseio.com";

// Authentication - Signup, Login, ResetPassword & ChangePassword
export const FIREBASE_API_KEY = 'AIzaSyCM3EESzn0vyMfwApqSeVA8-dCeYueVwHo';
export const FIREBASE_AUTH_SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
export const FIREBASE_AUTH_SIGNIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
export const FIREBASE_AUTH_CHANGEPASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`;
export const FIREBASE_AUTH_FORGETPASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;
