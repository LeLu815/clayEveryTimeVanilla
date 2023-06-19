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
  updateDoc,
} from "firebase/firestore";
import { app } from "../firebase/config.js";
import {
  createData,
  getDatasFirst,
  getData,
} from "../firebase/firestoreFunctions.js";
import { uploadImg } from "../firebase/fireStorageFunctions.js";

const db = getFirestore(app);
const contentCollection = collection(db, "content");
const playgroundRef = doc(contentCollection, "playground");
const playgroundBody = collection(playgroundRef, "body");
const playgroundComment = collection(playgroundRef, "comment");
const playgroundNestedComment = collection(playgroundRef, "nestedComment");
setDoc(playgroundRef, { merge: true });

export const getContentUpload = (req, res) => {
  return res.render("./content/upload");
};
export const postContentUpload = async (req, res) => {
  const {
    body: { title, mainText, image },
    files,
  } = req;
  const newContentOwnName = `playground_${new Date().getTime()}`;
  const refString = `/playground/${newContentOwnName}`;
  // const imgUrl = await uploadImg(refString, files);
  // console.log(imgUrl);
  const imgUrl = [];
  const createDataList = [title, mainText, imgUrl];

  await createData(refString, createDataList, res.locals.loggedInUser);
  return res.redirect("/content/upload");
};

export const getPlayground = async (req, res) => {
  const queryPlayground = await getDocs(playgroundBody);
  const playgroundList = [];
  queryPlayground.forEach((doc) => {
    const data = doc.data();
    playgroundList.push(data);
  });

  return res.render("./content/playground/outerPlayground", {
    playgroundList,
  });
};

export const getPlaygroundContent = async (req, res) => {
  const { id } = req.params;
  const queryPlaygroundContentData = await getData(id, `/playground/${id}`);
  // const queryPlaygroundContent = await getDoc(
  //   doc(db, "content/playground/body", id)
  // );
  // const queryPlaygroundContentData = queryPlaygroundContent.data();
  // console.log(queryPlaygroundContent.data());
  return res.render("./content/playground/getPlaygroundContent", {
    queryPlaygroundContentData,
  });
};

export const getPlaygroundContentEdit = async (req, res) => {
  const { id } = req.params;
  const queryPlaygroundContent = await getDoc(
    doc(db, "content/playground/body", id)
  );
  const queryPlaygroundContentData = queryPlaygroundContent.data();
  return res.render("./content/playground/playgroundContentEdit", {
    queryPlaygroundContentData,
  });
};

export const postPlaygroundContentEdit = async (req, res) => {};

export const getPlaygroundComment = async (req, res) => {
  const { id } = req.params;
  // const q = query(playgroundComment, where("contentOwnName", "==", id));
  // const playgroundCommentList = [];
  // const playgroundComment_docs = await getDocs(q);
  // playgroundComment_docs.forEach((doc) => {
  //   const data = doc.data();
  //   playgroundCommentList.push(data);
  // });

  let playgroundCommentList = [];
  // 구조분해할당시에 값이 없을 수도 있음.
  const { dataList = [], lastSnapShot = null } = (await getDatasFirst(
    `/playground/${id}/comments`,
    "createdAt"
  ))
    ? await getDatasFirst(`/playground/${id}/comments`, "createdAt")
    : [];
  if (dataList === null || lastSnapShot === null) {
    playgroundCommentList = null;
  }

  return res.render("./content/playground/playgroundComment", {
    playgroundCommentList: dataList,
  });
};

export const postPlaygroundComment = async (req, res) => {
  const {
    body: { commentText },
    params: { id },
  } = req;

  const newCommentOwnName = `playgroundComment_${new Date().getTime()}`;
  const refString = `/playground/${id}/comments/${newCommentOwnName}`;
  const createDataList = [commentText];
  await createData(refString, createDataList, res.locals.loggedInUser);

  res.redirect(`/content/playgroundComment/${id}`);
  // return res.render("./content/playground/playgroundComment", {
  //   playgroundCommentList,
  // });
};
