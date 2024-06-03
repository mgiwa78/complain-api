import { Request, Response } from "express";
import { ComplainType, TComplainTypeDoc } from "../models/complain-type";

export const Create__COMPLAIN_TYPES__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description, role } = req.body;
    const complainTypes: TComplainTypeDoc = await ComplainType.create({
      title,
      description,
      role,
    });

    return res.json({ status: "success", data: complainTypes });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const Update__COMPLAIN_TYPES__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainTypeId } = req.params;
    const { title, role, description } = req.body;

    await ComplainType.findByIdAndUpdate(complainTypeId, {
      title,
      role,
      description,
    });
    const complainTypes: Array<TComplainTypeDoc> = await ComplainType.find();

    return res.json({ status: "success", data: complainTypes });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__COMPLAIN_TYPES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const complainTypes: Array<TComplainTypeDoc> =
      await ComplainType.find().populate("role");

    return res.json({ status: "success", data: complainTypes });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__COMPLAIN_TYPES__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainTypeId } = req.params;
    await ComplainType.findByIdAndDelete(complainTypeId);
    const productCategories = await ComplainType.find();

    return res.json({ status: "success", data: productCategories });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
