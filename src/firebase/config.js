// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoFrYCYtXkhN1t7UXAXIowHPeBYDVl4EE",
  authDomain: "banner-creator.firebaseapp.com",
  projectId: "banner-creator",
  storageBucket: "banner-creator.appspot.com",
  messagingSenderId: "198687281083",
  appId: "1:198687281083:web:d20d937453d3b13fd7be9e",
  measurementId: "G-6XPLFX6ZCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
export const providerGoogle = new GoogleAuthProvider();
