"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Product_Categories_Controller_1 = require("../controllers/Product-Categories-Controller");
const complainTypesRouter = (0, express_1.Router)();
complainTypesRouter.post("/", Product_Categories_Controller_1.Create__COMPLAIN_TYPES__POST);
complainTypesRouter.delete("/:complainTypeId", require_auth_1.AuthenticateUser, Product_Categories_Controller_1.Delete__COMPLAIN_TYPES__DELETE);
complainTypesRouter.put("/:complainTypeId", require_auth_1.AuthenticateUser, Product_Categories_Controller_1.Update__COMPLAIN_TYPES__PUT);
complainTypesRouter.get("/", Product_Categories_Controller_1.Fetch__COMPLAIN_TYPES__GET);
exports.default = complainTypesRouter;
//# sourceMappingURL=complainTypesRouter.js.map