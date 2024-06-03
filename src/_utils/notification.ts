import { TComplain } from "../models/complain";
import { TUser, UserDoc } from "../models/user";
import newComplainMail from "./newComplainMail";

type NEW_COMPLAIN = { user: UserDoc; complain: TComplain };

type NotificationType = "NEW_COMPLAIN";

type NotificationData = {
  NEW_COMPLAIN: NEW_COMPLAIN;
};

const isNewComplain = (data: any): data is NEW_COMPLAIN => {
  return data && typeof data.user !== "undefined";
};

export const sendNotification = async (
  type: NotificationType,
  data: NotificationData[NotificationType]
) => {
  switch (type) {
    case "NEW_COMPLAIN":
      if (isNewComplain(data)) {
        await newComplainMail(data.user, data.complain);
      }
      break;
    default:
      break;
  }
};
