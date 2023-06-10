import express from "express";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware.js";
import {
  playgroundContent_like,
  playgroundCommnet_like,
  deleteContent,
  deleteComment,
  addNestedComment,
  deleteNestedComment,
  postPlaygroundCommentEdit,
} from "../controllers/apiController.js";
import VerEx from "verbal-expressions";

const apiRouter = express.Router();

// const playgroundRegex = VerEx()
//   .startOfLine()
//   .then("playground_")
//   .range("0", "9")
//   .repeatPrevious(13)
//   .endOfLine();
apiRouter
  .route(`/content/playground/:id([a-z]{10}_[0-9]{13})/like`)
  .all(protectorMiddleware)
  .get(playgroundContent_like);

apiRouter
  .route("/content/playground/:id([a-z]{17}_[0-9]{13})/like")
  .all(protectorMiddleware)
  .get(playgroundCommnet_like);

apiRouter
  .route("/content/delete/:id")
  .all(protectorMiddleware)
  .post(deleteContent);
apiRouter
  .route("/comment/delete/:id")
  .all(protectorMiddleware)
  .post(deleteComment);

apiRouter
  .route("/comment/:id/edit")
  .all(protectorMiddleware)
  .post(postPlaygroundCommentEdit);

apiRouter
  .route("/nestedComment/add/:id")
  .all(protectorMiddleware)
  .post(addNestedComment);

apiRouter
  .route("/nestedComment/delete/:id")
  .all(protectorMiddleware)
  .post(deleteNestedComment);

export default apiRouter;
