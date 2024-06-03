import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";

export interface TField {
  name: string;
}

export interface FieldDoc extends Doc, TField {}

interface FieldModel extends Model<FieldDoc> {
  build(attrs: TField): FieldDoc;
}

const FieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Field: FieldModel = (mongoose.models?.Field ||
  mongoose.model<FieldDoc, FieldModel>("Field", FieldSchema)) as FieldModel;

export { Field };
