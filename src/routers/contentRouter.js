import express from "express";

import {
  getContentUpload,
  postContentUpload,
  getPlayground,
  getPlaygroundContent,
  getPlaygroundContentEdit,
  postPlaygroundContentEdit,
  getPlaygroundComment,
  postPlaygroundComment,
} from "../controllers/playgroundController.js";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadImges,
} from "../middleware.js";

const contentRouter = express.Router();

contentRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getContentUpload)
  .post(uploadImges.array("images"), postContentUpload);

contentRouter.route("/playground").get(getPlayground);
contentRouter.route("/playground/:id").get(getPlaygroundContent);
contentRouter
  .route("/playground/:id/edit")
  .all(protectorMiddleware)
  .get(getPlaygroundContentEdit)
  .post(postPlaygroundContentEdit);

contentRouter
  .route("/playgroundComment/:id")
  .all(protectorMiddleware)
  .get(getPlaygroundComment)
  .post(postPlaygroundComment);

export default contentRouter;
