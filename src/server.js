import express from "express";
import session from "express-session";
import { localMiddleware } from "./middleware.js";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import contentRouter from "./routers/contentRouter.js";
import apiRouter from "./routers/apiRouter.js";

const app = express();

const PORT = 4000;

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// form 에서 오는 데이터를 req.body 로 읽을 수 있게 함.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(localMiddleware);
app.use("/client", express.static("src/client"));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/content", contentRouter);
app.use("/api", apiRouter);

const handleListening = () => {
  console.log(`✅ Server is listening on port : http://localhost:${PORT}/`);
};

app.listen(PORT, handleListening);
