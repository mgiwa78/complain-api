"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplainResponse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ComplainResponseSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
    },
    complain: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Complain",
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
ComplainResponseSchema.set("timestamps", true);
const ComplainResponse = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.ComplainResponse) ||
    mongoose_1.default.model("ComplainResponse", ComplainResponseSchema));
exports.ComplainResponse = ComplainResponse;
//# sourceMappingURL=complain-response.js.map