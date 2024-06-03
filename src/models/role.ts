import mongoose, { Document, Model, model, Schema } from "mongoose";

export interface TRole {
  name: string;
}

interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: TRole): RoleDoc;
}

export interface RoleDoc extends mongoose.Document {
  name: string;
}

const roleSchema = new Schema<RoleDoc, RoleModel>({
  name: { type: String, required: true },
});

roleSchema.set("timestamps", true);

const Role: RoleModel = (mongoose.models?.Role ||
  mongoose.model<RoleDoc, RoleModel>("Role", roleSchema)) as RoleModel;
// export default mongoose.models?.Role || mongoose.model("Role", roleSchema);

export { Role };
