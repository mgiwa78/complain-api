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
exports.Update__FIELD__PUT = exports.Delete__FIELD__DELETE = exports.Create__FIELD__POST = exports.Fetch__FIELD__GET = void 0;
const field_1 = require("../models/field");
const Fetch__FIELD__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = yield field_1.Field.find();
        return res.json({ status: "success", data: fields });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__FIELD__GET = Fetch__FIELD__GET;
const Create__FIELD__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const field = yield field_1.Field.create({
            name,
        });
        return res.json({ status: "success", data: field });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__FIELD__POST = Create__FIELD__POST;
const Delete__FIELD__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldId } = req.params;
        yield field_1.Field.findByIdAndDelete(fieldId);
        return res.json({ status: "success" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__FIELD__DELETE = Delete__FIELD__DELETE;
const Update__FIELD__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldId } = req.params;
        const { name } = req.body;
        const field = yield field_1.Field.findById(fieldId);
        field.name = name;
        field.save();
        return res.json({ status: "success", data: field });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__FIELD__PUT = Update__FIELD__PUT;
//# sourceMappingURL=Field-Controller.js.map