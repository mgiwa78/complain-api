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
exports.Delete__COMPLAIN_RESPONSE__DELETE = exports.Fetch__COMPLAIN_RESPONSES__GET = exports.Fetch__MY__COMPLAIN_RESPONSES__GET = exports.Update__COMPLAIN_RESPONSE__PUT = exports.Create__COMPLAIN_RESPONSE__POST = void 0;
const complain_response_1 = require("../models/complain-response");
const complain_1 = require("../models/complain");
const user_1 = require("../models/user");
const Create__COMPLAIN_RESPONSE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId, message, status, author } = req.body;
        const userData = yield user_1.User.findById(author);
        const complain = yield complain_1.Complain.findById(complainId);
        const complainResponses = yield complain_response_1.ComplainResponse.find({
            complain: complainId,
        });
        if (!complainResponses || complainResponses.length === 0) {
            complain.assigned = userData._id;
            complain.status = "open";
        }
        const complainResponse = yield complain_response_1.ComplainResponse.create({
            complain: complainId,
            message,
            author,
        });
        complain.status = status;
        console.log(complain);
        complain.save();
        return res.json({ status: "success", data: complainResponse });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__COMPLAIN_RESPONSE__POST = Create__COMPLAIN_RESPONSE__POST;
const Update__COMPLAIN_RESPONSE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        const { category, subject, description } = req.body;
        const complain = yield complain_response_1.ComplainResponse.findByIdAndUpdate(complainId, {
            category,
            description,
            subject,
        });
        const complains = yield complain_response_1.ComplainResponse.find();
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__COMPLAIN_RESPONSE__PUT = Update__COMPLAIN_RESPONSE__PUT;
const Fetch__MY__COMPLAIN_RESPONSES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const complains = yield complain_response_1.ComplainResponse.find({ author: user.id })
            .populate("author")
            .populate("category");
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY__COMPLAIN_RESPONSES__GET = Fetch__MY__COMPLAIN_RESPONSES__GET;
const Fetch__COMPLAIN_RESPONSES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        const complains = yield complain_response_1.ComplainResponse.find({
            complain: complainId,
        }).populate("author");
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMPLAIN_RESPONSES__GET = Fetch__COMPLAIN_RESPONSES__GET;
const Delete__COMPLAIN_RESPONSE__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        yield complain_response_1.ComplainResponse.findByIdAndDelete(complainId);
        const complains = yield complain_response_1.ComplainResponse.find();
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__COMPLAIN_RESPONSE__DELETE = Delete__COMPLAIN_RESPONSE__DELETE;
//# sourceMappingURL=Complain-Response-Controller.js.map