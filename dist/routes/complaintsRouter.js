"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Complain_Controller_1 = require("../controllers/Complain-Controller");
const complaintsRouter = (0, express_1.Router)();
// complaintsRouter.post("/", Create__COMPLAINT__POST);
complaintsRouter.get("/analytics/by-department", Complain_Controller_1.Fetch__COMPLAINTS_ANALYTICS__GET);
complaintsRouter.post("/:userId", Complain_Controller_1.Create__COMPLAINT__POST);
complaintsRouter.delete("/:complaintsId", Complain_Controller_1.Delete__COMPLAINT__DELETE);
complaintsRouter.put("/:complaintsId", Complain_Controller_1.Update__COMPLAINT__PUT);
complaintsRouter.get("/:userId", Complain_Controller_1.Fetch__COMPLAINTS__GET);
complaintsRouter.get("/get-complain/:complainId", Complain_Controller_1.Fetch__COMPLAIN__GET);
complaintsRouter.get("/myProjects/:userId", Complain_Controller_1.Fetch__MY_COMPLAINTS__GET);
complaintsRouter.get("/assignedProjects/:userId", Complain_Controller_1.Fetch__MY_ASSIGNED_COMPLAINTS__GET);
exports.default = complaintsRouter;
//# sourceMappingURL=complaintsRouter.js.map