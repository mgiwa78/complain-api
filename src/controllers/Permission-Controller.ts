import { Request, Response } from "express";
import { Permission, PermissionDoc } from "../models/permission";
import { User } from "../models/user";
import { Role } from "../models/role";

export const Fetch__PERMISSIONS__GET = async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.find();
    return res.json({ status: "success", data: permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
