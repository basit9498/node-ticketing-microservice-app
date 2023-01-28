import { Response, Request, NextFunction } from "express";
import { CustomError } from "../../error/custom-error";
import { DatabaseConnectionError } from "../../error/database-connection-error";
import { RequesValidationError } from "../../error/request-validation";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   if (err instanceof RequesValidationError) {
  //     // const formatterErrors = err.errors.map((error) => {
  //     //   return { message: error.msg, field: error.param };
  //     // });
  //     return res.status(err.statusCode).send({
  //       errors: err.serializeError(),
  //     });
  //   }

  //   if (err instanceof DatabaseConnectionError) {
  //     return res.status(err.statusCode).send({
  //       errors: err.serializeError(),
  //     });
  //     // return res.status(500).send({
  //     //   errors: [{ message: err.reason }],
  //     // });
  //   }

  // Convert into single error

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
    });
  }

  res.status(400).send({
    errors: [{ message: "Something went worong" }],
  });
};
