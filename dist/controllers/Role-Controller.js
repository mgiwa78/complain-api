"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create__ROLES__POST = exports.Fetch__ROLES__GET = void 0;
const role_1 = require("../models/role");
const Fetch__ROLES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.Role.find();
        return res.json({ status: "success", data: roles });
    }
    catch (error) {
        console.error("Error fetching roles:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ROLES__GET = Fetch__ROLES__GET;
const Create__ROLES__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    console.log(name);
    try {
        const role = new role_1.Role({ name });
        yield role.save();
        return res.status(201).json({ message: "Role created successfully" });
    }
    catch (error) {
        console.error("Error creating role:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__ROLES__POST = Create__ROLES__POST;
//# sourceMappingURL=Role-Controller.js.map