"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Complain_Response_Controller_1 = require("../controllers/Complain-Response-Controller");
const complainResponseRouter = (0, express_1.Router)();
complainResponseRouter.post("/", Complain_Response_Controller_1.Create__COMPLAIN_RESPONSE__POST);
complainResponseRouter.delete("/:complainResponseId", Complain_Response_Controller_1.Delete__COMPLAIN_RESPONSE__DELETE);
complainResponseRouter.put("/:complainId", Complain_Response_Controller_1.Update__COMPLAIN_RESPONSE__PUT);
complainResponseRouter.get("/:complainId", Complain_Response_Controller_1.Fetch__COMPLAIN_RESPONSES__GET);
exports.default = complainResponseRouter;
//# sourceMappingURL=compainResponse.js.map