import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./config";

export const getMediaURL = async (path: string) => {
  try {
    const mediaRef = ref(storage, path);
    return await getDownloadURL(mediaRef);
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (request: File) => {
  try {
    const bucketRef = ref(storage, request.name);
    const response: any = await uploadBytes(bucketRef, request);
    return await getDownloadURL(response.ref);
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const deleteFile = async (bucketPath: string) => {
  try {
    const bucketRef = ref(storage, bucketPath);
    await deleteObject(bucketRef);
  } catch (error) {
    console.log(error);
  }
};
