// import multer from "multer";
import { app } from "./firebase/config.js";
import { getAuth } from "firebase/auth";

export const localMiddleware = async (req, res, next) => {
  const auth = await getAuth(app);
  // console.log(auth.currentUser);
  const user = auth.currentUser;
  if (user) {
    res.locals.loggedIn = true;
    res.locals.loggedInUser = {
      localId: user.reloadUserInfo.localId,
      email: user.email,
      displayName: user.displayName,
    };
  } else {
    res.locals.loggedIn = false;
    res.locals.loggedInUser = {};
  }
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    return res.redirect("/user/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!res.locals.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};
