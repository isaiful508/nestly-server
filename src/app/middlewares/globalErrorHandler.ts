/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../types/error";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";


let errorSources: TErrorSource = [
  {
    path: '',
    message: 'Something went wrong',
  },
];

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  let statusCode = 500;
  let message = "Something Went wrong";

   if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    errorSources = simplifiedError.errorSources;
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode
  }
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    errorSources = simplifiedError.errorSources;
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode
  }
  else if (err?.errorResponse?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    errorSources = simplifiedError.errorSources;
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode
  } else if (err instanceof AppError) {
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
    message = err?.message;
    statusCode = err?.statusCode;
  } else if (err instanceof Error) {
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
    message = err?.message;
  }


   res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: null,
    // err
  })


}

export default globalErrorHandler;