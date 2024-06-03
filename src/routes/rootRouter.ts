import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";

import rolesRouter from "./rolesRouter";

import productCategoriesRouter from "./complainTypesRouter";
import complaintsRouter from "./complaintsRouter";
import complainTypesRouter from "./complainTypesRouter";
import complainResponseRouter from "./compainResponse";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Supervised API is online and running");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/roles", rolesRouter);
rootRouter.use("/users", userRouter);

rootRouter.use("/complain-types", complainTypesRouter);
rootRouter.use("/complaints", complaintsRouter);
rootRouter.use("/complain-response", complainResponseRouter);

export default rootRouter;
