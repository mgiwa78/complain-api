import express from "express";
import {
  Fetch__USERS__GET,
  Update__USER__PUT,
  Update__OWN_USER__PUT,
  Delete__USER__DELETE,
  Create__USER__POST,
  Fetch__USER__GET,
  Fetch__MY_PROFILE__GET,
  Update__PREFERENCE__PUT,
} from "../controllers/User-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { body } from "express-validator";

const router = express.Router();

router.post("/", Create__USER__POST);

router.get("/", Fetch__USERS__GET);

router.get("/:userId", Fetch__USER__GET);

router.put("/:userId", Update__USER__PUT);
router.put("/:userId/myPreference", Update__PREFERENCE__PUT);

router.put("/myProfile/update", Update__OWN_USER__PUT);
router.get("/myProfile/view", Fetch__MY_PROFILE__GET);

router.delete("/:id", Delete__USER__DELETE);

export default router;
