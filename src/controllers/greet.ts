import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/error/app-error";
import Greeting from "../models/greeting-model";
import IGreeting from "../interfaces/greeting-interface";

export const getAllGreetings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.query?.userId || (req.session as any).userId;
    if (!userId) throw new AppError("User not authenticated.", 400);

    const greetings: IGreeting[] = await Greeting.find({
      $or: [{ to: userId }, { from: userId }],
    });
    res.status(200).send(greetings);
    return;
  } catch (err: any) {
    next(err);
  }
};
