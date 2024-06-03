import { Request, Response } from "express";
import { Role, RoleDoc } from "../models/role";
import { User } from "../models/user";

export const Fetch__ROLES__GET = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find();

    return res.json({ status: "success", data: roles });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Create__ROLES__POST = async (req: Request, res: Response) => {
  const { name } = req.body;
  console.log(name);
  try {
    const role: RoleDoc = new Role({ name });

    await role.save();
    return res.status(201).json({ message: "Role created successfully" });
  } catch (error) {
    console.error("Error creating role:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
