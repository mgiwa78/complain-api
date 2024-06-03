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
exports.Delete__COMPLAINT__DELETE = exports.Fetch__MY_ASSIGNED_COMPLAINTS__GET = exports.Fetch__MY_COMPLAINTS__GET = exports.Fetch__COMPLAIN__GET = exports.Fetch__COMPLAINTS__GET = exports.Fetch__COMPLAINTS_ANALYTICS__GET = exports.Update__COMPLAINT__PUT = exports.Create__COMPLAINT__POST = void 0;
const complain_1 = require("../models/complain");
const user_1 = require("../models/user");
const notification_1 = require("../_utils/notification");
const complain_type_1 = require("../models/complain-type");
const Create__COMPLAINT__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, complaintype, description } = req.body;
        const { userId } = req.params;
        const complain = yield complain_1.Complain.create({
            title,
            type: complaintype,
            description,
            author: userId,
        });
        const typedata = yield complain_type_1.ComplainType.findById(complaintype);
        const users = yield user_1.User.find({ role: typedata.role });
        users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, notification_1.sendNotification)("NEW_COMPLAIN", { user, complain });
        }));
        return res.json({ status: "success", data: complain });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__COMPLAINT__POST = Create__COMPLAINT__POST;
const Update__COMPLAINT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        const { title, type, description } = req.body;
        yield complain_1.Complain.findByIdAndUpdate(complainId, {
            title,
            type,
            description,
        });
        const complain = yield complain_1.Complain.findById(complainId);
        return res.json({ status: "success", data: complain });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__COMPLAINT__PUT = Update__COMPLAINT__PUT;
const Fetch__COMPLAINTS_ANALYTICS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_1.User.findById(userId).populate("role");
        const complainTypes = yield complain_type_1.ComplainType.find().populate("role");
        const analytics = complainTypes.map((type) => __awaiter(void 0, void 0, void 0, function* () {
            const fortype = yield complain_1.Complain.find({ type: type._id }).populate("type");
            return { role: type.role, complains: fortype };
        }));
        const resolved = yield Promise.all(analytics);
        return res.json({ status: "success", data: resolved });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMPLAINTS_ANALYTICS__GET = Fetch__COMPLAINTS_ANALYTICS__GET;
const Fetch__COMPLAINTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_1.User.findById(userId).populate("role");
        if (user.role.name === "Admin") {
            const complains = yield complain_1.Complain.find()
                .populate("author")
                .populate("assigned")
                .populate("type");
            return res.json({ status: "success", data: complains });
        }
        else {
            const complains = yield complain_1.Complain.find()
                .populate("author")
                .populate("type")
                .populate("assigned")
                .populate({ path: "type", populate: { path: "role" } });
            const q = complains.filter((complain) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                console.log((_b = (_a = complain === null || complain === void 0 ? void 0 : complain.assigned) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString(), ((_c = user === null || user === void 0 ? void 0 : user._id) === null || _c === void 0 ? void 0 : _c.toString()) || !(complain === null || complain === void 0 ? void 0 : complain.assigned));
                return ((((_f = (_e = (_d = complain === null || complain === void 0 ? void 0 : complain.type) === null || _d === void 0 ? void 0 : _d.role) === null || _e === void 0 ? void 0 : _e._id) === null || _f === void 0 ? void 0 : _f.toString()) ===
                    ((_h = (_g = user === null || user === void 0 ? void 0 : user.role) === null || _g === void 0 ? void 0 : _g._id) === null || _h === void 0 ? void 0 : _h.toString()) &&
                    (((_k = (_j = complain === null || complain === void 0 ? void 0 : complain.assigned) === null || _j === void 0 ? void 0 : _j._id) === null || _k === void 0 ? void 0 : _k.toString()) === ((_l = user === null || user === void 0 ? void 0 : user._id) === null || _l === void 0 ? void 0 : _l.toString()) ||
                        !(complain === null || complain === void 0 ? void 0 : complain.assigned))) ||
                    (complain === null || complain === void 0 ? void 0 : complain.author._id.toString()) === ((_m = user === null || user === void 0 ? void 0 : user._id) === null || _m === void 0 ? void 0 : _m.toString()));
            });
            return res.json({ status: "success", data: q });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMPLAINTS__GET = Fetch__COMPLAINTS__GET;
const Fetch__COMPLAIN__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        const complain = yield complain_1.Complain.findById(complainId)
            .populate("author")
            .populate("type")
            .populate({ path: "type", populate: { path: "role" } });
        return res.json({ status: "success", data: complain });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__COMPLAIN__GET = Fetch__COMPLAIN__GET;
const Fetch__MY_COMPLAINTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const complains = yield complain_1.Complain.find({ student: { _id: userId } })
            .populate("student")
            .populate("supervisor")
            .populate("field");
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY_COMPLAINTS__GET = Fetch__MY_COMPLAINTS__GET;
const Fetch__MY_ASSIGNED_COMPLAINTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const complains = yield complain_1.Complain.find({ supervisor: { _id: userId } })
            .populate("student")
            .populate("supervisor")
            .populate("field");
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__MY_ASSIGNED_COMPLAINTS__GET = Fetch__MY_ASSIGNED_COMPLAINTS__GET;
const Delete__COMPLAINT__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complainId } = req.params;
        yield complain_1.Complain.findByIdAndDelete(complainId);
        const complains = yield complain_1.Complain.find();
        return res.json({ status: "success", data: complains });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__COMPLAINT__DELETE = Delete__COMPLAINT__DELETE;
//# sourceMappingURL=Complain-Controller.js.map