"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Permission_Controller_1 = require("../controllers/Permission-Controller");
const permissionsRouter = (0, express_1.Router)();
permissionsRouter.get("/", Permission_Controller_1.Fetch__PERMISSIONS__GET);
exports.default = permissionsRouter;
//# sourceMappingURL=permissionsRoute.js.map