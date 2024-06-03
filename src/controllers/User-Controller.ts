import { Request, Response } from "express";
import { TUser, User, UserDoc } from "../models/user";
import { Password } from "../services/password";
import { Role } from "../models/role";

// Fetch users for an organization

export const Fetch__USERS__GET = async (req: Request, res: Response) => {
  try {
    const allUsers: any = [];
    const { type } = req.query;

    let users;

    if (type !== "user" && type) {
      const role = await Role.findOne({ name: type });

      if (!role) {
        return res.status(500).json({ status: "error", error: "Invalid Role" });
      }
      users = await User.find({ role: { _id: role._id } }).populate("role");

      return res.json({ status: "success", data: users });
    }
    users = await User.find().populate("role");

    return res.json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__USER__GET = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("role");

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

// Update a user
export const Update__USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { fullName, lastName, studentId, contactNumber, email, password } =
      req.body;
    const pas = Password.toHash(password);

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, contactNumber, lastName, email, pas, studentId },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
export const Update__PREFERENCE__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { preference } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { preference },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Create__USER__POST = async (req: Request, res: Response) => {
  try {
    const { fullName, contactNumber, role, email, password } = req.body;
    const ifuser = await User.findOne({ email: email });

    if (ifuser) {
      return res
        .status(404)
        .json({ status: "error", error: "Email Already Exists" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      fullName,
      role,
      contactNumber,
      email,
      password: hashedPassword,
    });

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Update__OWN_USER__PUT = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { email, fullName, contactNumber } = req.body;

    const user: UserDoc = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        contactNumber,
        email,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.json({ status: "success", data: user });
  } catch (error) {
    console.error("Error updating own profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Delete__USER__DELETE = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ status: "error", error: "user not found" });
    }

    return res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};

export const Fetch__MY_PROFILE__GET = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const userData = await User.findById(user.id).populate("role");

    return res.json({ status: "success", data: userData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal server error" });
  }
};
