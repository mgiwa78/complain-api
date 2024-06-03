import mongoose, { Document as Doc, Model } from "mongoose";

export interface TComplainResponse {
  complain: string;
  message: string;
  author: string;
}

export interface TComplainResponseDoc extends Doc, TComplainResponse {}

interface TComplainResponseModel extends Model<TComplainResponseDoc> {
  build(attrs: TComplainResponse): TComplainResponseDoc;
}

const ComplainResponseSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  complain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complain",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

ComplainResponseSchema.set("timestamps", true);

const ComplainResponse: TComplainResponseModel = (mongoose.models
  ?.ComplainResponse ||
  mongoose.model<TComplainResponseDoc, TComplainResponseModel>(
    "ComplainResponse",
    ComplainResponseSchema
  )) as TComplainResponseModel;

export { ComplainResponse };
