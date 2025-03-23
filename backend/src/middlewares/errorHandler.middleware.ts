import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";

interface PassportError {
  errorFrom?: string;
  error: { message: string };
}

function isPassportError(error: any): error is PassportError {
  return error && typeof error === "object" && "errorFrom" in error;
}

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
  res.status(statusCode);
  console.log(err);
  let errorResponse: any = null;
  let errorMessage: string = "An unexpected error occurred";

  if (isPassportError(err)) {
    if (err.errorFrom === "passport") {
      errorMessage = err.error.message || "Authentication error";
      errorResponse = {
        type: "authentication_error",
        code: statusCode,
      };
    }
  } else if (err instanceof Error) {
    if ((err as any).isJoi && err instanceof ValidationError) {
      errorMessage = err.message;
      errorResponse = {
        type: "validation_error",
        details: err.details,
      };
    } else {
      errorMessage = err.message;
      errorResponse = {
        type: "general_error",
        name: err.name,
      };
    }
  } else {
    errorMessage = String(err);
  }

  res.json({
    success: false,
    error: errorResponse,
    message: errorMessage,
    stack: process.env.NODE_ENV === "production" ? null : (err as Error)?.stack,
  });
};

export default errorHandler;
