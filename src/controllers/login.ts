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
    const isUserNew = await isNewUser(firebaseToken);

    if (!isUserNew) {
      throw new AppError("User already logged in", 400);
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
    await User.create(newUser);
    (req.session as any).userId = userId;
    // Directly return userId
    res.status(200).send({ id: userId });
    return;
  } catch (err) {
    next(err);
  }
};

async function isNewUser(fcm: string) {
  const user = await User.findOne({ firebaseToken: fcm });
  if (user) {
    return false;
  } else {
    return true;
  }
}
