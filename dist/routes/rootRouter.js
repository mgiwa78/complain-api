"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const rolesRouter_1 = __importDefault(require("./rolesRouter"));
const complaintsRouter_1 = __importDefault(require("./complaintsRouter"));
const complainTypesRouter_1 = __importDefault(require("./complainTypesRouter"));
const compainResponse_1 = __importDefault(require("./compainResponse"));
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Complain API is online and running");
});
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/roles", rolesRouter_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.use("/complain-types", complainTypesRouter_1.default);
rootRouter.use("/complaints", complaintsRouter_1.default);
rootRouter.use("/complain-response", compainResponse_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map