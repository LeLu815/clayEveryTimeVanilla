import multer from "multer";

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

export const uploadImges = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한 (필요에 따라 조정 가능)
  },
});
