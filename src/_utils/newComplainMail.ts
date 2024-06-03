import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../__CONSTANTS__";
import { TUser, UserDoc } from "../models/user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

export default async (user: UserDoc, complain: any) => {
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
                  Dear ${user?.fullName},
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                  This email is to notify you that there has been a new comlain.
                </p>
                 

                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                 Student: ${complain?.fullName}
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
                Title: ${complain?.title}
                </p>
                <p style="margin-bottom: 2px; color: #3f4254; line-height: 1.6">
               Description: ${complain?.description}
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

  await transporter.sendMail(
    mailOptions,
    (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};
