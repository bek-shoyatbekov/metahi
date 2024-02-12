import { NextFunction, Request, Response } from "express";

import { AppError } from "../../utils/error/app-error";
import Relatives from "../../models/relatives-model";
import User from "../../models/user-model";

export const identifyCommonUserContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, contacts } = req.body;
    if (!contacts || !userId) {
      throw new AppError("userId and contacts are required", 400);
    }

    const isValidUser = await User.findOne({ id: userId });

    if (!isValidUser) {
      throw new AppError("User not found", 404);
    }

    const relatedUsers = await Relatives.find({
      contacts: { $in: contacts },
    }).select("relatives userId contacts _id");

    let user = await Relatives.findOne({ userId });
    if (!user) {
      const newUserRelatives = await Relatives.create({
        userId,
        contacts,
        relatives: [],
      });
      user = newUserRelatives;
    } else {
      user.contacts = contacts;
      await user.save();
    }

    console.log("Related users", relatedUsers);

    for (let anotherUser of relatedUsers) {
      if (anotherUser.relatives.filter((u) => u === userId).length === 0) {
        anotherUser.relatives.push(userId);
      }

      if (
        user?.relatives.filter((u) => u === anotherUser.userId).length === 0 &&
        anotherUser.userId !== userId
      ) {
        user?.relatives.push(anotherUser.userId);
      }

      await Promise.all([await anotherUser.save(), await user?.save()]);
    }

    res.status(200).send({ message: "Contacts added successfully" });
    return;
  } catch (err) {
    next(err);
  }
};
