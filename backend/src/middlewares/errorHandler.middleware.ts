import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(statusCode);

  let errorResponse;
  let errorMessage;

  if (err.errorFrom === "passport") {
    if (err.error.message) {
      errorMessage = err.error.message;
    }
    errorResponse = err.error;
  }

  res.json({
    success: false,
    error: errorResponse,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
