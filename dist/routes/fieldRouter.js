"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Field_Controller_1 = require("../controllers/Field-Controller");
const fieldRouter = (0, express_1.Router)();
fieldRouter.get("/", Field_Controller_1.Fetch__FIELD__GET);
fieldRouter.post("/", Field_Controller_1.Create__FIELD__POST);
fieldRouter.delete("/:fieldId", Field_Controller_1.Delete__FIELD__DELETE);
fieldRouter.put("/:fieldId", Field_Controller_1.Update__FIELD__PUT);
exports.default = fieldRouter;
//# sourceMappingURL=fieldRouter.js.map