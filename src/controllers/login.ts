import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user-model";
import IUser from "../interfaces/user-interface";
import { AppError } from "../utils/error/app-error";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const image = req.file?.filename;
    const firebaseToken = req.body.firebaseToken;

    if (!username || !image || !firebaseToken) {
      throw new AppError("username ,avatar and firebaseToken required", 400);
    }

    // Generate UUID
    const userId = uuidv4();

    // Save to DB
    const newUser: IUser = {
      id: userId,
      username,
      avatar: image,
      firebaseToken,
    };
    const result = await User.create(newUser);
    req.session.userId = userId;
    // Directly return userId
    res.status(200).send(userId);
    return;
  } catch (err) {
    next(err);
  }
};
