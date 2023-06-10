import express from "express";
import { home, search } from "../controllers/globalController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware.js";

const globalRouter = express.Router();

globalRouter.get("/", home);

export default globalRouter;
