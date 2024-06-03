import mongoose, { Document, Model, model, Schema } from "mongoose";
import { TRole } from "./role";

export interface TUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
  preference: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        isAdmin: boolean;
        email: string;
        id: string;
        fullName: string;
        role: string;
      };
    }
  }
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: TUser): UserDoc;
}

export interface UserDoc extends Document, TUser {}

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
  },
});

userSchema.set("timestamps", true);

export const User: UserModel = (mongoose.models.User ||
  model<UserDoc>("User", userSchema)) as UserModel;
