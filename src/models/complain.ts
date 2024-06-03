import { ObjectId } from "mongodb";
import mongoose, { Document as Doc, Model } from "mongoose";

export interface TComplain {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  type: string;
  assigned: string;
  author: string;
}

export interface TComplainDoc extends Doc, TComplain {}

interface TComplainModel extends Model<TComplainDoc> {
  build(attrs: TComplain): TComplainDoc;
}

const ComplainSchema = new mongoose.Schema({
  field: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: ObjectId,
    ref: "User",
  },
  assigned: {
    type: ObjectId,
    ref: "User",
  },
  type: {
    type: ObjectId,
    ref: "ComplainType",
  },
});

ComplainSchema.set("timestamps", true);

const Complain: TComplainModel = (mongoose.models?.Complain ||
  mongoose.model<TComplainDoc, TComplainModel>(
    "Complain",
    ComplainSchema
  )) as TComplainModel;

export { Complain };
