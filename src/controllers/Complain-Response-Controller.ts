import { Request, Response } from "express";
import {
  ComplainResponse,
  TComplainResponseDoc,
} from "../models/complain-response";
import { ObjectId } from "mongodb";
import { Complain, TComplainDoc } from "../models/complain";
import { User } from "../models/user";
import { sendNotification } from "../_utils/notification";

export const Create__COMPLAIN_RESPONSE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainId, message, status, author } = req.body;

    const userData = await User.findById(author);
    const complain: TComplainDoc = await Complain.findById(complainId);

    const complainResponses = await ComplainResponse.find({
      complain: complainId,
    });

    if (!complainResponses || complainResponses.length === 0) {
      complain.assigned = userData._id;
      complain.status = "open";
    }

    const complainResponse: TComplainResponseDoc =
      await ComplainResponse.create({
        complain: complainId,
        message,
        author,
      });

    complain.status = status;

    console.log(complain);
    complain.save();
    return res.json({ status: "success", data: complainResponse });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Update__COMPLAIN_RESPONSE__PUT = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainId } = req.params;
    const { category, subject, description } = req.body;

    const complain: TComplainResponseDoc =
      await ComplainResponse.findByIdAndUpdate(complainId, {
        category,
        description,
        subject,
      });
    const complains = await ComplainResponse.find();
    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__MY__COMPLAIN_RESPONSES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req;

    const complains = await ComplainResponse.find({ author: user.id })
      .populate("author")
      .populate("category");

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Fetch__COMPLAIN_RESPONSES__GET = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainId } = req.params;

    const complains = await ComplainResponse.find({
      complain: complainId,
    }).populate("author");

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const Delete__COMPLAIN_RESPONSE__DELETE = async (
  req: Request,
  res: Response
) => {
  try {
    const { complainId } = req.params;
    await ComplainResponse.findByIdAndDelete(complainId);
    const complains = await ComplainResponse.find();

    return res.json({ status: "success", data: complains });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
