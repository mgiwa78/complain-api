import { Router } from "express";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { AuthenticateUser } from "../middleware/require-auth";

import {
  Create__COMPLAIN_TYPES__POST,
  Fetch__COMPLAIN_TYPES__GET,
  Delete__COMPLAIN_TYPES__DELETE,
  Update__COMPLAIN_TYPES__PUT,
} from "../controllers/Product-Categories-Controller";

const complainTypesRouter: Router = Router();

complainTypesRouter.post("/", Create__COMPLAIN_TYPES__POST);
complainTypesRouter.delete(
  "/:complainTypeId",
  AuthenticateUser,
  Delete__COMPLAIN_TYPES__DELETE
);
complainTypesRouter.put(
  "/:complainTypeId",
  AuthenticateUser,
  Update__COMPLAIN_TYPES__PUT
);

complainTypesRouter.get("/", Fetch__COMPLAIN_TYPES__GET);

export default complainTypesRouter;
