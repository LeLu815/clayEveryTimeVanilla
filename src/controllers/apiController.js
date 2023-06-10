import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
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
  deleteDoc,
} from "firebase/firestore";

import { app } from "../firebase/config.js";
import { list } from "firebase/storage";
const auth = getAuth(app);
const db = getFirestore(app);
const contentCollection = collection(db, "content");
const playgroundRef = doc(contentCollection, "playground");
const playgroundBody = collection(playgroundRef, "body");
const playgroundComment = collection(playgroundRef, "comment");
const playgroundNestedComment = collection(playgroundRef, "nestedComment");

export const playgroundContent_like = async (req, res) => {
  const { id } = req.params;
  const { localId } = res.locals.loggedInUser;
  const queryPlaygroundContent = await getDoc(
    doc(db, "content/playground/body", id)
  );
  if (!queryPlaygroundContent) {
    return res.status(400).json(null);
  }
  const queryPlaygroundContentData = queryPlaygroundContent.data();
  const index = queryPlaygroundContentData.likedUserId.indexOf(localId);
  const isExist = index !== -1 ? true : false;
  const likedUserIdList = [...queryPlaygroundContentData.likedUserId];

  if (isExist) {
    likedUserIdList.splice(index, 1);
    await updateDoc(doc(db, "content/playground/body", id), {
      likes: likedUserIdList.length,
      likedUserId: likedUserIdList,
    });
  } else {
    likedUserIdList.push(localId);
    await updateDoc(doc(db, "content/playground/body", id), {
      likes: likedUserIdList.length,
      likedUserId: likedUserIdList,
    });
  }

  return res.status(200).json({ length: likedUserIdList.length });
};

export const playgroundCommnet_like = async (req, res) => {
  const { id } = req.params;
  const { localId } = res.locals.loggedInUser;
  const queryPlaygroundComment = await getDoc(
    doc(db, "content/playground/comment", id)
  );
  const queryPlaygroundCommentData = queryPlaygroundComment.data();
  const index = queryPlaygroundCommentData.likedUserId.indexOf(localId);
  const isExist = index !== -1 ? true : false;
  const likedUserIdList = [...queryPlaygroundCommentData.likedUserId];

  if (isExist) {
    likedUserIdList.splice(index, 1);
    await updateDoc(doc(db, "content/playground/comment", id), {
      likes: likedUserIdList.length,
      likedUserId: likedUserIdList,
    });
    return res.status(200).json({ length: likedUserIdList.length });
  } else {
    likedUserIdList.push(localId);
    await updateDoc(doc(db, "content/playground/comment", id), {
      likes: likedUserIdList.length,
      likedUserId: likedUserIdList,
    });
    return res.status(200).json({ length: likedUserIdList.length });
  }
};

export const deleteContent = async (req, res) => {
  const {
    body: { isDel },
    params: { id },
  } = req;
  let newIsDel;
  let newId;
  if (id.includes("_")) {
    newId = id.split("_")[0];
    newIsDel = new Array(id);
  } else {
    newId = id;
    newIsDel = typeof isDel === list ? isDel : [isDel];
  }
  if (newIsDel.length === 0) {
    return res.redirect("/user/profile/content");
  }
  console.log(newIsDel, newId);
  try {
    for (const body_id of newIsDel) {
      const commentQuery = query(
        playgroundComment,
        where("contentOwnName", "==", body_id)
      );
      const playgroundComment_docs = await getDocs(commentQuery);
      const playgroundCommentList = [];
      playgroundComment_docs.forEach((doc) => {
        const data = doc.data();
        playgroundCommentList.push(data.newCommentOwnName);
      });

      const nestedCommentQuery = query(
        playgroundNestedComment,
        where("commentOwnName", "==", body_id)
      );
      const playgroundNestedComment_docs = await getDocs(nestedCommentQuery);
      const playgroundNestedCommentList = [];
      playgroundNestedComment_docs.forEach((doc) => {
        const data = doc.data();
        playgroundNestedCommentList.push(data.newNestedCommentOwnName);
      });

      for (const docId of newIsDel) {
        await deleteDoc(doc(playgroundBody, docId));
      }

      if (playgroundCommentList.length === 0) {
        switch (newId) {
          case "profile":
            return res.redirect(`/user/${id}/content`);
          case "playground":
            return res.redirect("/content/playground");
        }
      }
      for (const docId of playgroundCommentList) {
        await deleteDoc(doc(playgroundComment, docId));
      }

      if (playgroundNestedCommentList.length === 0) {
        switch (newId) {
          case "profile":
            return res.redirect(`/user/${id}/content`);
          case "playground":
            return res.redirect("/content/playground");
        }
      }
      for (const docId of playgroundNestedCommentList) {
        await deleteDoc(doc(playgroundNestedComment, docId));
      }
    }
  } catch (error) {
    console.log(error);
  }
  switch (newId) {
    case "profile":
      return res.redirect(`/user/${id}/content`);
    case "playground":
      return res.redirect("/content/playground");
  }
};

export const deleteComment = async (req, res) => {
  const {
    body: { isDel, contentIds },
    params: { id },
  } = req;
  let contentId;
  if (isDel === undefined) {
    switch (id) {
      case "profile":
        return res.redirect(`/user/${id}/content`);
      case "playground":
        contentId = req.body;
        return res.redirect("/content/playground");
    }
  }
  const newIsDel = typeof isDel === list ? isDel : [isDel];

  try {
    for (const docId of newIsDel) {
      const nestedCommentQuery = query(
        playgroundNestedComment,
        where("commentOwnName", "==", docId)
      );

      await deleteDoc(doc(playgroundComment, docId));

      const playgroundNestedComment_docs = await getDocs(nestedCommentQuery);
      const playgroundNestedCommentList = [];
      playgroundNestedComment_docs.forEach((doc) => {
        const data = doc.data();
        playgroundNestedCommentList.push(data.newNestedCommentOwnName);
      });
      if (playgroundNestedCommentList.length !== 0) {
        for (const docId of playgroundNestedCommentList) {
          await deleteDoc(doc(playgroundNestedComment, docId));
        }
      }
    }
    for (const id of contentIds) {
      const commentQuery = query(
        playgroundComment,
        where("contentOwnName", "==", id)
      );
      const playgroundComment_docs = await getDocs(commentQuery);
      const playgroundCommentList = [];
      playgroundComment_docs.forEach((doc) => {
        const data = doc.data();
        playgroundCommentList.push(data);
      });

      await updateDoc(doc(playgroundBody, id), {
        comment: playgroundCommentList.length,
      });
    }
  } catch (error) {
    console.log(error);
    if (id !== "profile") {
      return res.status(400).json({
        message: "bad",
      });
    }
    return res.redirect(`/user/${id}/content`);
  }
  if (id !== "profile") {
    console.log("contentId :", contentId);
    return res.status(200).json({
      message: "ok",
    });
  }
  return res.redirect(`/user/${id}/content`);
};

export const postPlaygroundCommentEdit = async (req, res) => {
  const {
    params: { id },
    body: { text },
  } = req;

  try {
    await updateDoc(doc(playgroundComment, id), {
      commentText: text,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
};

export const deleteNestedComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
  } = req;
  try {
    await deleteDoc(doc(playgroundNestedComment, id));
    const queryComment = await getDoc(doc(playgroundComment, commentId));
    let commentData = queryComment.data();
    const newLsit = commentData.nestedCommentList.filter((id) => id !== id);
    await updateDoc(doc(playgroundComment, commentId), {
      nestedCommentList: newLsit,
      nestedComment: newLsit.length,
    });
    return res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "bad",
    });
  }
};

export const addNestedComment = async (req, res) => {
  const {
    params: { id },
    body: { text, contentId, commentId },
  } = req;

  try {
    const newNestedCommentOwnName = `playgroundNestedComment_${new Date().getTime()}`;
    const newNestedComment = {
      nestedCommentText: text,
      createdAt: Timestamp.fromDate(new Date()),
      owner: res.locals.loggedInUser,
      contentOwnName: contentId,
      commentOwnName: commentId,
      newNestedCommentOwnName,
    };
    await setDoc(
      doc(playgroundNestedComment, newNestedCommentOwnName),
      newNestedComment
    );

    const queryPlaygroundComment = await getDoc(
      doc(db, "content/playground/comment", commentId)
    );
    const queryPlaygroundCommentData = queryPlaygroundComment.data();
    const likeCount = queryPlaygroundCommentData.nestedComment + 1;
    const nestedCommentList = queryPlaygroundCommentData.nestedCommentList;
    nestedCommentList.push(newNestedComment);
    await updateDoc(doc(playgroundComment, commentId), {
      nestedComment: likeCount,
      nestedCommentList,
    });

    return res.status(200).json({
      message: "good",
      id: newNestedCommentOwnName,
      username: res.locals.loggedInUser.displayName,
      imgUrl: "이미지 주소",
      nestedCommentText: text,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "bad",
      id: "",
      username: "",
      nestedCommentText: "",
    });
  }
};
