"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../controllers/User-Controller");
const router = express_1.default.Router();
router.post("/", User_Controller_1.Create__USER__POST);
router.get("/", User_Controller_1.Fetch__USERS__GET);
router.get("/:userId", User_Controller_1.Fetch__USER__GET);
router.put("/:userId", User_Controller_1.Update__USER__PUT);
router.put("/:userId/myPreference", User_Controller_1.Update__PREFERENCE__PUT);
router.put("/myProfile/update", User_Controller_1.Update__OWN_USER__PUT);
router.get("/myProfile/view", User_Controller_1.Fetch__MY_PROFILE__GET);
router.delete("/:id", User_Controller_1.Delete__USER__DELETE);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map