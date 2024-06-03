import { Request, Response } from "express";
import { TField, Field, FieldDoc } from "../models/field";

export const Fetch__FIELD__GET = async (req: Request, res: Response) => {
  try {
    const fields: FieldDoc[] = await Field.find();

    return res.json({ status: "success", data: fields });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Create__FIELD__POST = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const field: FieldDoc = await Field.create({
      name,
    });

    return res.json({ status: "success", data: field });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__FIELD__DELETE = async (req: Request, res: Response) => {
  try {
    const { fieldId } = req.params;
    await Field.findByIdAndDelete(fieldId);

    return res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__FIELD__PUT = async (req: Request, res: Response) => {
  try {
    const { fieldId } = req.params;
    const { name } = req.body;

    const field: FieldDoc = await Field.findById(fieldId);
    field.name = name;
    field.save();
    return res.json({ status: "success", data: field });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
