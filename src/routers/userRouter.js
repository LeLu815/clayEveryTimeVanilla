import express from "express";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
  profile,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  getfindPassword,
  postfindPassword,
  getWithdrawal,
  getProfileContent,
  getProfileComment,
} from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
userRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
userRouter.route("/logout").all(protectorMiddleware).get(logout);

userRouter.route("/profile").all(protectorMiddleware).get(profile);
userRouter
  .route("/profile/edit")
  .all(protectorMiddleware)
  .get(getEditProfile)
  .post(postEditProfile);
userRouter
  .route("/profile/edit/pasword")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

userRouter
  .route("/profile/edit/withdrawal")
  .all(protectorMiddleware)
  .get(getWithdrawal)
  .post();

userRouter
  .route("/login/password")
  .all(publicOnlyMiddleware)
  .get(getfindPassword)
  .post(postfindPassword);

userRouter
  .route("/profile/content")
  .all(protectorMiddleware)
  .get(getProfileContent);

userRouter
  .route("/profile/comment")
  .all(protectorMiddleware)
  .get(getProfileComment);
export default userRouter;
