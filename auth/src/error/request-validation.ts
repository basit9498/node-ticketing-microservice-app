import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequesValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request Paramter");

    Object.setPrototypeOf(this, RequesValidationError.prototype);
  }
  serializeError() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
