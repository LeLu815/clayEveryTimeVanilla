import * as dotenv from "dotenv";
dotenv.config();
import multer from "multer";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage, ref } from "firebase/storage";
import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
} from "firebase/firestore";

// Firebase 초기화 설정
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const backgroundImg = ref(storage, "background/backgroud_1.jpg");
export const backgroundImg = ref(
  storage,
  "gs://clayeverytimevanilla.appspot.com/background/backgroud_1.jpg"
);

// export const appFireStore = getFirestore(app);
// export const appAuth = getAuth();
// export const timestamp = Timestamp;
