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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const newComplainMail_1 = __importDefault(require("./newComplainMail"));
const isNewComplain = (data) => {
    return data && typeof data.user !== "undefined";
};
const sendNotification = (type, data) => __awaiter(void 0, void 0, void 0, function* () {
    switch (type) {
        case "NEW_COMPLAIN":
            if (isNewComplain(data)) {
                yield (0, newComplainMail_1.default)(data.user, data.complain);
            }
            break;
        default:
            break;
    }
});
exports.sendNotification = sendNotification;
//# sourceMappingURL=notification.js.map