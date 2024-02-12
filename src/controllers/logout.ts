import { NextFunction, Request, Response } from "express";

import Relatives from "../models/relatives-model";
import User from "../models/user-model";
import { AppError } from "../utils/error/app-error";
import deleteFile from "../utils/fs/delete-file";
import path from "path";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAvatar = req.query?.avatar;
    (req.session as any).userId = "";
    const userId = req.headers?.userid;
    if (!userId) {
      throw new AppError("userId not found", 400);
    }
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const avatar = path.join("public", `${user?.avatar}`);

    if (!isAvatar) {
      await Promise.all([
        deleteFile(avatar),
        User.deleteOne({ id: userId }),
        Relatives.deleteOne({ userId }),
      ]);
    }
    await User.deleteOne({ id: userId });
    res.status(200).send("User logged out successfully");
    return;
  } catch (err) {
    next(err);
  }
};
