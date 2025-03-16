import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";

interface PassportError extends Error {
  status?: number;
  statusCode?: number;
  errorFrom?: string;
  name: string;
  message: string;
}

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
  res.status(statusCode);

  let errorResponse;
  let errorMessage;

  if (err instanceof Error) {
    // if (err instanceof PrismaClientValidationError) {
    //   errorMessage = err.message + err.name;
    // }

    const passportError = err as PassportError;
    if (passportError.errorFrom === "passport") {
      if (passportError.message) {
        errorMessage = passportError.message;
      }
    }

    if ((err as any).isJoi) {
      if (err instanceof ValidationError) {
        errorMessage = err.message;
      }
    }

    errorMessage = err.message;
  }

  res.json({
    success: false,
    error: errorResponse,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : (err as Error)?.stack,
  });
};

export default errorHandler;
