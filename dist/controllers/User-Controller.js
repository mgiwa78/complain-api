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
exports.Fetch__MY_PROFILE__GET = exports.Delete__USER__DELETE = exports.Update__OWN_USER__PUT = exports.Create__USER__POST = exports.Update__PREFERENCE__PUT = exports.Update__USER__PUT = exports.Fetch__USER__GET = exports.Fetch__USERS__GET = void 0;
const user_1 = require("../models/user");
const password_1 = require("../services/password");
const role_1 = require("../models/role");
// Fetch users for an organization
const Fetch__USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = [];
        const { type } = req.query;
        let users;
        if (type !== "user" && type) {
            const role = yield role_1.Role.findOne({ name: type });
            if (!role) {
                return res.status(500).json({ status: "error", error: "Invalid Role" });
            }
            users = yield user_1.User.find({ role: { _id: role._id } }).populate("role");
            return res.json({ status: "success", data: users });
        }
        users = yield user_1.User.find().populate("role");
        return res.json({ status: "success", data: users });
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__USERS__GET = Fetch__USERS__GET;
const Fetch__USER__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_1.User.findById(userId).populate("role");
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__USER__GET = Fetch__USER__GET;
// Update a user
const Update__USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { fullName, lastName, studentId, contactNumber, email, password } = req.body;
        const pas = password_1.Password.toHash(password);
        const user = yield user_1.User.findByIdAndUpdate(userId, { fullName, contactNumber, lastName, email, pas, studentId }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__USER__PUT = Update__USER__PUT;
const Update__PREFERENCE__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { preference } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, { preference }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__PREFERENCE__PUT = Update__PREFERENCE__PUT;
const Create__USER__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, contactNumber, role, email, password } = req.body;
        const ifuser = yield user_1.User.findOne({ email: email });
        if (ifuser) {
            return res
                .status(404)
                .json({ status: "error", error: "Email Already Exists" });
        }
        const hashedPassword = yield password_1.Password.toHash(password);
        const user = yield user_1.User.create({
            fullName,
            role,
            contactNumber,
            email,
            password: hashedPassword,
        });
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__USER__POST = Create__USER__POST;
const Update__OWN_USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { email, fullName, contactNumber } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, {
            fullName,
            contactNumber,
            email,
        }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating own profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__OWN_USER__PUT = Update__OWN_USER__PUT;
const Delete__USER__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: "user not found" });
        }
        return res.json({
            status: "success",
            message: "User deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting User:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__USER__DELETE = Delete__USER__DELETE;
const Fetch__MY_PROFILE__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const userData = yield user_1.User.findById(user.id).populate("role");
        return res.json({ status: "success", data: userData });
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__MY_PROFILE__GET = Fetch__MY_PROFILE__GET;
//# sourceMappingURL=User-Controller.js.map