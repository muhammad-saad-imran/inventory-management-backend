export default class ApiError extends Error {
  public isOperational = true;
  constructor(
    public message: string = "Internal server Error",
    public statusCode: number = 500
  ) {
    super(message);
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
    this.name = this.constructor.name; //set our function’s name as error name.
  }
}
