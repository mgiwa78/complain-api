import { Router } from "express";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";

import {
  Create__COMPLAIN_RESPONSE__POST,
  Delete__COMPLAIN_RESPONSE__DELETE,
  Fetch__COMPLAIN_RESPONSES__GET,
  Update__COMPLAIN_RESPONSE__PUT,
} from "../controllers/Complain-Response-Controller";

const complainResponseRouter: Router = Router();

complainResponseRouter.post("/", Create__COMPLAIN_RESPONSE__POST);

complainResponseRouter.delete(
  "/:complainResponseId",
  Delete__COMPLAIN_RESPONSE__DELETE
);

complainResponseRouter.put("/:complainId", Update__COMPLAIN_RESPONSE__PUT);

complainResponseRouter.get("/:complainId", Fetch__COMPLAIN_RESPONSES__GET);

export default complainResponseRouter;
