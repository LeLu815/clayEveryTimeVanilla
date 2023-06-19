import { storage, backgroundImg } from "../firebase/config.js";
import { getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/config.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const db = getFirestore(app);
const contentCollection = collection(db, "content");
const playgroundRef = doc(contentCollection, "playground");
const playgroundBody = collection(playgroundRef, "body");
const playgroundComment = collection(playgroundRef, "comment");
const playgroundNestedComment = collection(playgroundRef, "nestedComment");

import { createData, getDatasFirst } from "../firebase/firestoreFunctions.js";

export const home = async (req, res) => {
  // const dataUrl = await getDownloadURL(backgroundImg);
  const dataUrl =
    "https://images.unsplash.com/photo-1608491545066-18f37f4dec11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80";
  // const playgroundWhole = await getDoc(playgroundRef);
  // let playgroundWholeData;
  // if (playgroundWhole.exists()) {
  //   playgroundWholeData = playgroundWhole.data();
  // } else {
  //   playgroundWholeData = {};
  // }
  // const queryPlayground = await getDocs(playgroundBody);
  // const playgroundList = [];
  // queryPlayground.forEach((doc) => {
  //   const data = doc.data();
  //   playgroundList.push(data);
  // });
  const { dataList, lastSnapShot } = await getDatasFirst(
    "playground",
    "createdAt",
    5
  );
  const q = query(playgroundBody, orderBy("createdAt"), limit(5));
  const playgroundList_5 = [];
  const queryPlayground_5 = await getDocs(q);
  queryPlayground_5.forEach((doc) => {
    const data = doc.data();
    playgroundList_5.push(data);
  });
  console.log(dataList);
  return res.render("./global/home", { dataUrl, playgroundList_5, dataList });
};

export const search = () => {};
