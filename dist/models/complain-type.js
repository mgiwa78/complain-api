"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplainType = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const ComplainTypeSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    role: {
        type: mongodb_1.ObjectId,
        ref: "Role",
    },
});
ComplainTypeSchema.set("timestamps", true);
const ComplainType = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.ComplainType) ||
    mongoose_1.default.model("ComplainType", ComplainTypeSchema));
exports.ComplainType = ComplainType;
//# sourceMappingURL=complain-type.js.map