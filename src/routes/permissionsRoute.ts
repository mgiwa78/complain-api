import { Router } from "express";
import { Fetch__PERMISSIONS__GET } from "../controllers/Permission-Controller";

const permissionsRouter = Router();

permissionsRouter.get("/", Fetch__PERMISSIONS__GET);

export default permissionsRouter;
