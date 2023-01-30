import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Database Error";
  statusCode = 500;
  constructor() {
    super("Error DB Connection");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
