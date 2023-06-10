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
  const { title, mainText } = req.body;
  const newContentOwnName = `playground_${new Date().getTime()}`;
  const newContent = {
    title,
    mainText,
    createdAt: Timestamp.fromDate(new Date()),
    owner: res.locals.loggedInUser,
    comment: 0,
    likes: 0,
    likedUserId: [],
    newContentOwnName,
  };
  await setDoc(doc(playgroundBody, newContentOwnName), newContent);
  return res.redirect("/content/upload");
};

export const getPlayground = async (req, res) => {
  const queryPlayground = await getDocs(playgroundBody);
  const playgroundList = [];
  queryPlayground.forEach((doc) => {
    const data = doc.data();
    playgroundList.push(data);
  });
  // console.log(playgroundList);
  return res.render("./content/playground/outerPlayground", { playgroundList });
};

export const getPlaygroundContent = async (req, res) => {
  const { id } = req.params;
  const queryPlaygroundContent = await getDoc(
    doc(db, "content/playground/body", id)
  );
  const queryPlaygroundContentData = queryPlaygroundContent.data();
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
  const q = query(playgroundComment, where("contentOwnName", "==", id));
  const playgroundCommentList = [];
  const playgroundComment_docs = await getDocs(q);
  playgroundComment_docs.forEach((doc) => {
    const data = doc.data();
    playgroundCommentList.push(data);
  });
  return res.render("./content/playground/playgroundComment", {
    playgroundCommentList,
  });
};

export const postPlaygroundComment = async (req, res) => {
  const {
    body: { commentText },
    params: { id },
  } = req;

  const newCommentOwnName = `playgroundComment_${new Date().getTime()}`;
  const newComment = {
    commentText,
    createdAt: Timestamp.fromDate(new Date()),
    owner: res.locals.loggedInUser,
    nestedComment: 0,
    nestedCommentList: [],
    likes: 0,
    likedUserId: [],
    contentOwnName: id,
    newCommentOwnName,
  };
  await setDoc(doc(playgroundComment, newCommentOwnName), newComment);

  const q = query(playgroundComment, where("contentOwnName", "==", id));
  const playgroundCommentList = [];
  const playgroundComment_docs = await getDocs(q);
  playgroundComment_docs.forEach((doc) => {
    const data = doc.data();
    playgroundCommentList.push(data);
  });

  await updateDoc(doc(db, "content/playground/body", id), {
    comment: playgroundCommentList.length,
  });

  res.redirect(`/content/playgroundComment/${id}`);
  // return res.render("./content/playground/playgroundComment", {
  //   playgroundCommentList,
  // });
};
