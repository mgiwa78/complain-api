import { Request, Response } from "express";
import { Complain, TComplainDoc } from "../models/complain";
import { User, UserDoc } from "../models/user";
import { Field } from "../models/field";
import { Role } from "../models/role";
import { sendNotification } from "../_utils/notification";
import { ComplainType } from "../models/complain-type";

export const Create__COMPLAINT__POST = async (req: Request, res: Response) => {
  try {
    const { title, complaintype, description } = req.body;
    const { userId } = req.params;

    const complain = await Complain.create({
      title,
      type: complaintype,
      description,
      author: userId,
    });
    const typedata = await ComplainType.findById(complaintype);
    const users = await User.find({ role: typedata.role });

    users.forEach(async (user) => {
      await sendNotification("NEW_COMPLAIN", { user, complain });
    });

    return res.json({ status: "success", data: complain });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__COMPLAINT__PUT = async (req: Request, res: Response) => {
  try {
    const { complainId } = req.params;
    const { title, type, description } = req.body;

    await Complain.findByIdAndUpdate(complainId, {
      title,
      type,
      description,
    });

    const complain = await Complain.findById(complainId);
    return res.json({ status: "success", data: complain });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__COMPLAINTS_ANALYTICS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const user: any = await User.findById(userId).populate("role");
    const complainTypes = await ComplainType.find().populate("role");

    const analytics = complainTypes.map(async (type) => {
      const fortype = await Complain.find({ type: type._id }).populate("type");
      return { role: type.role, complains: fortype };
    });

    const resolved = await Promise.all(analytics);
    return res.json({ status: "success", data: resolved });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__COMPLAINTS__GET = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user: any = await User.findById(userId).populate("role");

    if (user.role.name === "Admin") {
      const complains = await Complain.find()
        .populate("author")
        .populate("assigned")
        .populate("type");

      return res.json({ status: "success", data: complains });
    } else {
      const complains = await Complain.find()
        .populate("author")
        .populate("type")
        .populate("assigned")
        .populate({ path: "type", populate: { path: "role" } });
      const q = complains.filter((complain: any) => {
        console.log(
          complain?.assigned?._id?.toString(),
          user?._id?.toString() || !complain?.assigned
        );
        return (
          (complain?.type?.role?._id?.toString() ===
            user?.role?._id?.toString() &&
            (complain?.assigned?._id?.toString() === user?._id?.toString() ||
              !complain?.assigned)) ||
          complain?.author._id.toString() === user?._id?.toString()
        );
      });
      return res.json({ status: "success", data: q });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__COMPLAIN__GET = async (req: Request, res: Response) => {
  try {
    const { complainId } = req.params;
    const complain = await Complain.findById(complainId)
      .populate("author")
      .populate("type")
      .populate({ path: "type", populate: { path: "role" } });

    return res.json({ status: "success", data: complain });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY_COMPLAINTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const complains = await Complain.find({ student: { _id: userId } })
      .populate("student")
      .populate("supervisor")
      .populate("field");

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY_ASSIGNED_COMPLAINTS__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const complains = await Complain.find({ supervisor: { _id: userId } })
      .populate("student")
      .populate("supervisor")
      .populate("field");

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__COMPLAINT__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainId } = req.params;
    await Complain.findByIdAndDelete(complainId);
    const complains = await Complain.find();

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
