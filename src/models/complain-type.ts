import { ObjectId } from "mongodb";
import mongoose, { Document as Doc, Model } from "mongoose";

export interface TComplainType {
  title: string;
  description: string;
  role: string;
}

export interface TComplainTypeDoc extends Doc, TComplainType {}

interface TComplainTypeModel extends Model<TComplainTypeDoc> {
  build(attrs: TComplainType): TComplainTypeDoc;
}

const ComplainTypeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  role: {
    type: ObjectId,
    ref: "Role",
  },
});

ComplainTypeSchema.set("timestamps", true);

const ComplainType: TComplainTypeModel = (mongoose.models?.ComplainType ||
  mongoose.model<TComplainTypeDoc, TComplainTypeModel>(
    "ComplainType",
    ComplainTypeSchema
  )) as TComplainTypeModel;

export { ComplainType };
