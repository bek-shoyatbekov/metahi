import { NextFunction, Request, Response } from "express";
import { join } from "node:path";

import { AppError } from "../utils/error/app-error";
import User from "../models/user-model";
import deleteFile from "../utils/fs/delete-file";

const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;

    const { username, isAvatar } = req.body;
    const avatar = req.file?.filename || req.body?.avatar;
    if (!userId && !username) throw new AppError("Missing fields", 400);

    const user = await User.findOne({ id: userId });
    if (!user) throw new AppError("User not found", 400);

    if (user.avatar != avatar && !isAvatar) {
      const oldAvatarPath = join("public", `${user.avatar}`);
      await deleteFile(oldAvatarPath);
    }

    // Update the user's information in database
    user.avatar = avatar ?? user.avatar;
    user.username = username ?? user.username;
    await user.save();
    res.status(200).send({ message: "User profile updated" });
    return;
  } catch (err) {
    next(err);
  }
};

export default editProfile;
