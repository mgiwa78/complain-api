import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../__CONSTANTS__";
import { User } from "../models/user";

// const Permission = require("../models/permission");
// const Role = require("../models/role");

interface DecodedToken extends JwtPayload {
  userId: string;
  organization: string;
  roles: string;
  permissions: string[];
}

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", error: "No token provided" });
  }

  const decoded = jwt.verify(
    token.replace("Bearer ", ""),
    JWT_SECRET
  ) as unknown as DecodedToken;

  if (!decoded) {
    return res
      .status(409)
      .json({ status: "error", error: "Authentication is required" });
  }

  try {
    const userData = await User.findById(decoded.user._id).populate("roles");

    if (userData) {
      req.user = {
        isAdmin: userData.role === "admin",
        id: decoded.user._id,
        role: userData.role,
        ...userData,
      };
    } else {
      return res.status(401).json({ status: "error", error: "User Not Found" });
    }
    next();
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    return res
      .status(409)
      .json({ status: "error", error: "Authentication is required" });
  }
};
