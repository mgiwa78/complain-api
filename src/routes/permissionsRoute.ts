import { Router } from "express";
import { Fetch__PERMISSIONS__GET } from "../controllers/Permission-Controller";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";

const permissionsRouter = Router();

permissionsRouter.get("/", Fetch__PERMISSIONS__GET);

export default permissionsRouter;
