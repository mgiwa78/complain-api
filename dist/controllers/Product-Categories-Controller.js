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
exports.Delete__COMPLAIN_TYPES__DELETE = exports.Fetch__COMPLAIN_TYPES__GET = exports.Update__COMPLAIN_TYPES__PUT = exports.Create__COMPLAIN_TYPES__POST = void 0;
const complain_type_1 = require("../models/complain-type");
const Create__COMPLAIN_TYPES__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, role } = req.body;
        const complainTypes = yield complain_type_1.ComplainType.create({
            title,
            description,
            role,
        });
        return res.json({ status: "success", data: complainTypes });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__COMPLAIN_TYPES__POST = Create__COMPLAIN_TYPES__POST;
const Update__COMPLAIN_TYPES__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainTypeId } = req.params;
        const { title, role, description } = req.body;
        yield complain_type_1.ComplainType.findByIdAndUpdate(complainTypeId, {
            title,
            role,
            description,
        });
        const complainTypes = yield complain_type_1.ComplainType.find();
        return res.json({ status: "success", data: complainTypes });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__COMPLAIN_TYPES__PUT = Update__COMPLAIN_TYPES__PUT;
const Fetch__COMPLAIN_TYPES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complainTypes = yield complain_type_1.ComplainType.find().populate("role");
        return res.json({ status: "success", data: complainTypes });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMPLAIN_TYPES__GET = Fetch__COMPLAIN_TYPES__GET;
const Delete__COMPLAIN_TYPES__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainTypeId } = req.params;
        yield complain_type_1.ComplainType.findByIdAndDelete(complainTypeId);
        const productCategories = yield complain_type_1.ComplainType.find();
        return res.json({ status: "success", data: productCategories });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__COMPLAIN_TYPES__DELETE = Delete__COMPLAIN_TYPES__DELETE;
//# sourceMappingURL=Product-Categories-Controller.js.map