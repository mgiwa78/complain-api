"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FieldSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Field = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Field) ||
    mongoose_1.default.model("Field", FieldSchema));
exports.Field = Field;
//# sourceMappingURL=field.js.map