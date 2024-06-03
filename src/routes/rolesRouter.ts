import { Router } from "express";
import {
  Fetch__ROLES__GET,
  Create__ROLES__POST,
} from "../controllers/Role-Controller";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";

const rolesRouter = Router();

rolesRouter.get("/", Fetch__ROLES__GET);

rolesRouter.post("/", Create__ROLES__POST);

export default rolesRouter;
