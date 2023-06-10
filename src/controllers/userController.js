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
} from "firebase/firestore";
import { app } from "../firebase/config.js";

// 전역으로 사용해보기
const auth = getAuth(app);
const db = getFirestore(app);
const contentCollection = collection(db, "content");
const playgroundRef = doc(contentCollection, "playground");
const playgroundBody = collection(playgroundRef, "body");
const playgroundComment = collection(playgroundRef, "comment");
const playgroundNestedComment = collection(playgroundRef, "nestedComment");

const userDetailCollection = collection(db, "userDetail");

export const getLogin = (req, res) => {
  res.render("./user/login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  // const persistence = setPersistence(auth, browserLocalPersistence);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);

    return res.redirect("/user/login");
  }
  return res.redirect("/");
};

export const logout = async (req, res) => {
  await signOut(auth);
  res.redirect("/");
};

export const getJoin = (req, res) => {
  return res.render("./user/join");
};

export const postJoin = async (req, res) => {
  const { id, email, password, introduce, gender } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(userDetailCollection, email), {
      introduce,
      gender,
    });

    await updateProfile(auth.currentUser, {
      displayName: id,
      introduce,
    });
    req.locals.loggedIn = Boolean(getAuth(app).currentUser);

    // console.log(console.log("유저 :", getAuth(app).currentUsedr));
  } catch (error) {
    console.log(error);
    return res.redirect("/user/join");
  }

  return res.redirect("/user/login");
};

export const profile = async (req, res) => {
  const contentQuery = query(
    playgroundBody,
    where("owner", "==", res.locals.loggedInUser)
  );
  const commentQuery = query(
    playgroundComment,
    where("owner", "==", res.locals.loggedInUser)
  );

  const playgroundContentList = [];
  const playgroundCommentList = [];

  const playgroundContent_docs = await getDocs(contentQuery);
  const playgroundComment_docs = await getDocs(commentQuery);

  playgroundContent_docs.forEach((doc) => {
    const data = doc.data();
    playgroundContentList.push(data);
  });
  playgroundComment_docs.forEach((doc) => {
    const data = doc.data();
    playgroundCommentList.push(data);
  });

  res.render("./user/profile", {
    user: res.locals.loggedInUser,
    playgroundContentList,
    playgroundCommentList,
  });
};

export const getEditProfile = async (req, res) => {
  const myUserDetail = await getDoc(
    doc(userDetailCollection, res.locals.loggedInUser.email)
  );
  res.render("./user/editProfile", {
    user: res.locals.loggedInUser,
    userData: myUserDetail.data(),
  });
};

export const postEditProfile = async (req, res) => {
  const { displayName, introduce, gender } = req.body;
  await updateProfile(auth.currentUser, {
    displayName,
  });
  await updateDoc(doc(userDetailCollection, res.locals.loggedInUser.email), {
    introduce,
    gender,
  });
  res.redirect("/user/profile/edit");
};

export const getChangePassword = (req, res) => {
  res.render("./user/changePassword", {
    user: res.locals.loggedInUser,
  });
};

export const postChangePassword = async (req, res) => {
  const { password, newPassword, newPasswordCheck } = req.body;
  const user = res.locals.loggedInUser;
  const authUser = auth.currentUser;

  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    const test = await reauthenticateWithCredential(authUser, credential);
    if (newPassword === newPasswordCheck) {
      return res.render("./user/changePassword", {
        errorMessage: "비밀번호가 일치하지 않습니다.",
        user,
      });
    }
    await updatePassword(authUser, newPassword);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

export const getfindPassword = (req, res) => {
  return res.render("./user/findPasswordEmail");
};

export const postfindPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.redirect("/user/login/password");
  }
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/user/login");
};

export const getWithdrawal = (req, res) => {
  const user = res.locals.loggedInUser;
  return res.render("./user/withdrawalUser", { user });
};

export const postWithdrawal = async (req, res) => {
  const { deleteUserEmail } = req.body;
  const user = auth.currentUser;

  if (deleteUserEmail !== res.locals.loggedInUser.email) {
    res.redirect("/user/profile/edit/withdrawal");
  }
  try {
    await deleteUser(user);
  } catch (error) {
    console.log(error);
    res.redirect("/user/profile/edit/withdrawal");
  }
  return res.redirect("/user/login");
};

export const getProfileContent = async (req, res) => {
  const user = res.locals.loggedInUser;
  const userContentList = [];
  // console.log(user);
  try {
    const q = query(playgroundBody, where("owner.localId", "==", user.localId));
    const userContent = await getDocs(q);
    userContent.forEach((doc) => {
      const data = doc.data();
      userContentList.push(data);
      // console.log(data);
    });
    // console.log(userContentList);
    return res.render("./user/profileContent", { userContentList });
  } catch (error) {
    console.log(error);
    return res.redirect("/user/profile");
  }
};

export const getProfileComment = async (req, res) => {
  const user = res.locals.loggedInUser;
  const userCommentList = [];
  try {
    const q = query(
      playgroundComment,
      where("owner.localId", "==", user.localId)
    );
    const userComment = await getDocs(q);
    userComment.forEach((doc) => {
      const data = doc.data();
      userCommentList.push(data);
    });

    return res.render("./user/profileComment", { userCommentList });
  } catch (error) {
    console.log(error);
  }
};
