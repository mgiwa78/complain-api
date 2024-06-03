"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Role_Controller_1 = require("../controllers/Role-Controller");
const rolesRouter = (0, express_1.Router)();
rolesRouter.get("/", Role_Controller_1.Fetch__ROLES__GET);
rolesRouter.post("/", Role_Controller_1.Create__ROLES__POST);
exports.default = rolesRouter;
//# sourceMappingURL=rolesRouter.js.map