import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";
import { AppError } from "../utils/error/app-error";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.userId = "";
    const userId = req.body?.userId;
    if (!userId) {
      throw new AppError("userId not found", 400);
    }
    await User.deleteOne({ id: userId });
    res.status(200).send("You have logged out");
    return;
  } catch (err) {
    next(err);
  }
};
