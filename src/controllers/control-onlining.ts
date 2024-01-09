import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";
import { AppError } from "../utils/error/app-error";

export const turnOnOrOffUserOnlineStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, status } = req.body;
    if (!userId) throw new AppError("userId not found", 400);
    const user = await User.findOne({ id: userId });
    if (!user) throw new AppError("user not found", 404);
    user.isOnline = status as boolean;
    await user.save();
    res.status(200).send({ message: `User status changed : ${user.isOnline}` });
    return;
  } catch (err) {
    next(err);
  }
};
