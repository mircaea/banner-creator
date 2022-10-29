import { BannerType } from "./types";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./config";

const BANNERS_COLLECTION = collection(firestore, "banners");

export const getDocsFromCollection = async (
  collection: CollectionReference
) => {
  try {
    const collectionQuery = query(collection);
    const snapShot = await getDocs(collectionQuery);
    let data: object[] = [];
    snapShot.forEach((snap) => {
      const obj = { id: snap.id, ...snap.data() };
      data.push(obj);
    });
    return data;
  } catch (error) {
    console.log("getDocsFromCollection", error);
    // error handling;
  }
};
export const createDocInCollection = async (
  collection: CollectionReference,
  request: object
) => {
  try {
    const docRef = await addDoc(collection, request);
    let docData;
    const snapShot = await getDoc(docRef);
    if (snapShot.exists())
      docData = { id: snapShot.id, ...snapShot.data() } as BannerType;
    return docData;
  } catch (error) {
    console.log("createDocInCollection", error);
    // error handling;
  }
};
export const deleteDocByPath = async (path: string) => {
  try {
    const docRef = doc(firestore, path);
    return await deleteDoc(docRef);
  } catch (error) {
    console.log("deleteDocByPath", error);
    // error handling;
  }
};

export const getBanners = async () => {
  return await getDocsFromCollection(BANNERS_COLLECTION);
};
export const createBanner = async (request: BannerType) => {
  return await createDocInCollection(BANNERS_COLLECTION, request);
};
export const updateBanner = async (request: BannerType) => {
  try {
    const docRef = doc(firestore, `banners/${request.id}`);
    await updateDoc(docRef, request as object);
  } catch (error) {
    console.log("updateBanner", error);
    // error handling;
  }
};
