"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complain = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const ComplainSchema = new mongoose_1.default.Schema({
    field: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Field",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending",
    },
    author: {
        type: mongodb_1.ObjectId,
        ref: "User",
    },
    assigned: {
        type: mongodb_1.ObjectId,
        ref: "User",
    },
    type: {
        type: mongodb_1.ObjectId,
        ref: "ComplainType",
    },
});
ComplainSchema.set("timestamps", true);
const Complain = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Complain) ||
    mongoose_1.default.model("Complain", ComplainSchema));
exports.Complain = Complain;
//# sourceMappingURL=complain.js.map