export class CustomError<T> extends Error {
  code: T;
  constructor(message: string, code: T) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}