import ApiError  from "./ApiError";

export default class BadRequestError extends ApiError {
  constructor(message: string = "Invalid Request") {
    super(message, 400);
  }
}
