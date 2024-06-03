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
const nodemailer_1 = __importDefault(require("nodemailer"));
const __CONSTANTS__1 = require("../__CONSTANTS__");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: __CONSTANTS__1.EMAIL,
        pass: __CONSTANTS__1.PASSWORD,
    },
});
exports.default = (user, complain) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `
<style>
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter, Helvetica, "sans-serif";
  }
  a:hover {
    color: #009ef7;
  }
</style>

<div
    style="
      background-color: #ffffff;
      padding: 45px 0 34px 0;
      border-radius: 24px;
      margin: 40px auto;
      max-width: 600px;
    "
  >
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      height="auto"
      style="border-collapse: collapse"
    >
      <tbody>
        <tr>
          <td
            align="center"
            valign="center"
            style="text-align: center; padding-bottom: 10px"
          >
            <div style="text-align: left; margin-bottom: 54px">
              <div
                style="
                  font-size: 14px;
                  font-weight: 500;
                  margin: 0 60px 30px 60px;
                  font-family: Arial, Helvetica, sans-serif;
                "
              >
                <p
                  style="
                    color: #181c32;
                    font-size: 28px;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 24px;
                  "
                >
                  New Complain
                </p>

                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  Dear ${user === null || user === void 0 ? void 0 : user.fullName},
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  This email is to notify you that there has been a new comlain.
                </p>
                 

                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                 Student: ${complain === null || complain === void 0 ? void 0 : complain.fullName}
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                Title: ${complain === null || complain === void 0 ? void 0 : complain.title}
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
               Description: ${complain === null || complain === void 0 ? void 0 : complain.description}
                </p>
                
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
`;
    const mailOptions = {
        from: "Supervised",
        to: user.email,
        subject: "New Complain",
        html: emailHtml,
    };
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
});
//# sourceMappingURL=newComplainMail.js.map