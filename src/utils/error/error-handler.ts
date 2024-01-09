import { Request, Response } from "express";

import { AppError } from "./app-error";
import { logger } from "../log/logger";

export function errorHandler(
  err: AppError | Error,
  req: Request,
  res: Response
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  // If it's not an instance of AppError, we consider it as a generic
  // error
  res.status(500).send({
    message: "Internal server error",
  });
  logger.error(err);
}
