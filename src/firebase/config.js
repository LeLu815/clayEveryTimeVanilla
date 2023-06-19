import * as dotenv from "dotenv";
dotenv.config();

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
export const storage = getStorage(app, "gs://clayeverytimevanilla.appspot.com");
export const mystorage = getStorage(app);
export const backgroundImg = ref(
  mystorage,
  "gs://clayeverytimevanilla.appspot.com/background/backgroud_1.jpg"
);
