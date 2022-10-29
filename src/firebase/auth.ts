import { auth, providerGoogle } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export async function sign_up(
  email: string,
  password: string,
  successCallback: Function,
  errorCallback: Function
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    successCallback();
  } catch (error) {
    errorCallback(error);
  }
}

export async function sign_in(
  email: string,
  password: string,
  successCallback: Function,
  errorCallback: Function
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    successCallback();
  } catch (error) {
    errorCallback(error);
  }
}

export async function google_sign_in(
  successCallback: Function,
  errorCallback: Function
) {
  try {
    await signInWithPopup(auth, providerGoogle);
    successCallback();
  } catch (error) {
    errorCallback(error);
  }
}

export async function sign_out(
  successCallback: Function,
  errorCallback: Function
) {
  try {
    await signOut(auth);
    successCallback();
  } catch (error) {
    errorCallback(error);
  }
}
