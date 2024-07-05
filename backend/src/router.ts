import * as express from "express";
const router = express.Router();

//middlewares
//todo import user auth middleware

//importing routers
import userRouter from "./modules/user/user.router";

//assigning routers
router.use("/user", userRouter);

export default router;
