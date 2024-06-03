import { Router } from "express";
import {
  Create__FIELD__POST,
  Delete__FIELD__DELETE,
  Fetch__FIELD__GET,
  Update__FIELD__PUT,
} from "../controllers/Field-Controller";

const fieldRouter: Router = Router();

fieldRouter.get("/", Fetch__FIELD__GET);
fieldRouter.post("/", Create__FIELD__POST);

fieldRouter.delete("/:fieldId", Delete__FIELD__DELETE);
fieldRouter.put("/:fieldId", Update__FIELD__PUT);

export default fieldRouter;
