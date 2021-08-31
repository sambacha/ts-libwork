import { CustomError } from "./CustomError";
import { ErrorCodes } from "./ErrorCodes";

export class DatabaseError extends CustomError<ErrorCodes> {
  private constructor(message: string, code: ErrorCodes) {
    super(message, code);
    this.name = "DatabaseError";
  }

  static ConnectionFailed(): DatabaseError {
    return new DatabaseError("Connection failed", ErrorCodes.ConnectionFailed);
  }

  static ConnectionStringIsMissing(): DatabaseError {
    return new DatabaseError("Connection string is missing", ErrorCodes.ConnectionStringIsMissing);
  }
}