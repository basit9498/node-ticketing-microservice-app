import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequesValidationError } from "../error/request-validation";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // We preduce error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequesValidationError(errors.array());
  }
  next();
};
