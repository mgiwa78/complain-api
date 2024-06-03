import { Router } from "express";
import { body } from "express-validator";

import {
  Create__COMPLAINT__POST,
  Delete__COMPLAINT__DELETE,
  Fetch__MY_ASSIGNED_COMPLAINTS__GET,
  Fetch__MY_COMPLAINTS__GET,
  Fetch__COMPLAINTS__GET,
  Update__COMPLAINT__PUT,
  Fetch__COMPLAIN__GET,
  Fetch__COMPLAINTS_ANALYTICS__GET,
} from "../controllers/Complain-Controller";

const complaintsRouter: Router = Router();

// complaintsRouter.post("/", Create__COMPLAINT__POST);
complaintsRouter.get(
  "/analytics/by-department",
  Fetch__COMPLAINTS_ANALYTICS__GET
);
complaintsRouter.post("/:userId", Create__COMPLAINT__POST);
complaintsRouter.delete("/:complaintsId", Delete__COMPLAINT__DELETE);
complaintsRouter.put("/:complaintsId", Update__COMPLAINT__PUT);

complaintsRouter.get("/:userId", Fetch__COMPLAINTS__GET);
complaintsRouter.get("/get-complain/:complainId", Fetch__COMPLAIN__GET);
complaintsRouter.get("/myProjects/:userId", Fetch__MY_COMPLAINTS__GET);
complaintsRouter.get(
  "/assignedProjects/:userId",
  Fetch__MY_ASSIGNED_COMPLAINTS__GET
);

export default complaintsRouter;
